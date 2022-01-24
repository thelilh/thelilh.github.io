using System;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;

namespace Arena
{

    [DataContract]
    public class Character
    {
        [DataMember]
        public string namn; //Namn!

        [DataMember]
        public int befinnande; //Hälsa!

        [DataMember]
        public int styrka; //Styrka!

        [DataMember]
        public int svard; //Svärd!

        [DataMember]
        public int fart; //Fart!

        [DataMember]
        public int brostplat; //Bröstplåt!

        [DataMember]
        public int benskydd; //Benskydd!

        [DataMember]
        public bool dead; //Är spelaren död?

        public Character(string namn, int befinnande, int styrka, bool dead, int svard, int fart, int brostplat, int benskydd)
        {
            this.namn = namn;
            this.befinnande = befinnande;
            this.styrka = styrka;
            this.dead = dead;
            this.svard = svard;
            this.fart = fart;
            this.brostplat = brostplat;
            this.benskydd = benskydd;
        }
        public override string ToString()
        {
            string returnString = namn + " har en hälsa av " + befinnande + ", en styrka på " + styrka;
            return returnString;
        }
        public int TaSkada(int dmg)
        {
            int temp = this.befinnande - dmg;
            return temp;
        }
        public bool CheckIfDead()
        {
            if (this.befinnande <= 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public int RullaTarningen()
        {
            Random slump = new Random();
            return slump.Next(1, 7); //Mellan 1 och 6.
        }
        public void Attakera(Character offer, Game spelet)
        {
            offer.befinnande = offer.TaSkada(this.styrka);
            Console.WriteLine(String.Format("{0} slog {2}. {2} tog {1} skada.", this.namn, this.styrka, offer.namn));
            spelet.LoggaDetta(String.Format("{2} skades av {0} ({1} skada).", this.namn, this.styrka, offer.namn));

            if (offer.befinnande < 0)
            {
                offer.dead = true;
            }
        }
    }
    [DataContract]
    public class Game
    {
        [DataMember]
        public int minbefinnande;

        [DataMember]
        public int maxbefinnande;

        [DataMember]
        public int minstyrka;

        [DataMember]
        public int maxstyrka;

        [DataMember]
        public int rundorAvklarade;

        [DataMember]
        public List<string> log = new List<string>();

        public Game(int minbefinnande, int maxbefinnande, int minstyrka, int maxstyrka, int rundorAvklarade, string text)
        {
            this.minbefinnande = minbefinnande;
            this.maxbefinnande = maxbefinnande;
            this.minstyrka = minstyrka;
            this.maxstyrka = maxstyrka;
            this.rundorAvklarade = rundorAvklarade;
            this.log.Add(text);
        }

        public void LoggaDetta(string text)
        {
            //Ifall texten ej är null, lägg till den.
            if (text != null)
            {
                this.log.Add(text);
            }
        }
    }
    class ArenaFighter
    {
        static void SaveViaDataContractSerialization<T>(T serializableObject, string filepath)
        {
            var serializer = new DataContractSerializer(typeof(T));
            var settings = new XmlWriterSettings()
            {
                Indent = true,
                IndentChars = "\t",
            };
            var writer = XmlWriter.Create(filepath, settings);
            serializer.WriteObject(writer, serializableObject);
            writer.Close();
        }


        static T LoadViaDataContractSerialization<T>(string filepath)
        {
            var fileStream = new FileStream(filepath, FileMode.Open);
            var reader = XmlDictionaryReader.CreateTextReader(fileStream, new XmlDictionaryReaderQuotas());
            var serializer = new DataContractSerializer(typeof(T));
            T serializableObject = (T)serializer.ReadObject(reader, true);
            reader.Close();
            fileStream.Close();
            return serializableObject;
        }

        static Character CharacterCreation(Game spelet)
        {
            //TODO: lägg till flera namn, spelare kanske är för bra!
            string[] namn = new string[] { "Sofia Björn", "Clidna Annemarie", "Timo Thorne", "Merrill Latasha", "Jarka Iona", "Liis Rafaela", "Floella Halinka", "Elva Lamya", "Britta Conchobhar", "Alana Ellie", "Magni Tonya" };
            Random rand = new Random();

            //Hälsa, mellan 1 och 100.
            int sbefinnande = rand.Next(spelet.minbefinnande, spelet.maxbefinnande);

            //Ge motståndaren ett namn
            int rNamn = rand.Next(1, namn.Length);

            //Skapa Motståndaren
            Character motstandare = new Character(namn[rNamn], sbefinnande, 0, false, 1, rand.Next(1, 51), 0, 0); 

            //Modifiera styrkan
            motstandare.styrka = motstandare.RullaTarningen();

            //Spara motståndaren
            SaveViaDataContractSerialization(motstandare, "motstandare.xml");   //Spara Motståndaren

            //Ge tillbaka motståndaren till spelet
            return motstandare;
        }

        static void Runda(Character spelare, Character motstandare, Game spelet)
        {
            Console.Clear();
            spelet.LoggaDetta(String.Format("Runda {0}", spelet.rundorAvklarade));
            int playerMaxbefinnande = spelare.befinnande;
            bool avslutarSpelet = false;
            Console.WriteLine(String.Format("{0} möter {1}. Du har en hälsa av {2} och en styrka på {3}, motståndaren har en hälsa på {4}.", spelare.namn, motstandare.namn, spelare.befinnande, spelare.styrka, motstandare.befinnande));
            Console.WriteLine("Klicka enter för att fortsätta...");
            Console.ReadLine();
            while (!spelare.dead && !motstandare.dead && !avslutarSpelet)
            {
                Console.Clear();
                Console.WriteLine(String.Format("Din hälsa: {0}", spelare.befinnande));
                Console.WriteLine(String.Format("{0}s hälsa: {1}", motstandare.namn, motstandare.befinnande));

                
                Console.WriteLine("1) Attakera");
                Console.WriteLine("2) Ge upp");
                Console.WriteLine("3) Avsluta och spara");
                Console.Write("\r\nVad vill du göra? ");
                switch (Console.ReadLine())
                {
                    case "1":
                        //Motståndaren tar skada
                        spelare.Attakera(motstandare, spelet);
                        break;
                    case "2":
                        //Spelaren ger upp
                        spelare.Attakera(spelare, spelet);
                        avslutarSpelet = true;
                        break;
                    case "3":
                        //Spelaren avslutar och sparar
                        Console.WriteLine(String.Format("Det verkar som att {0} vill ta en paus. Än så länge har {0} klarat sig i {1} rundor.", spelare.namn, spelet.rundorAvklarade));
                        spelet.LoggaDetta(String.Format("Spelet avslutades vid runda {0} av spelaren.", spelet.rundorAvklarade));
                        avslutarSpelet = true;
                        SaveGame(spelet, spelare, motstandare);
                        break;
                    default:
                        //Motståndaren tar skada
                        spelare.Attakera(motstandare, spelet);
                        break;
                }
                if (!avslutarSpelet)
                {
                    if (motstandare.befinnande > 0)
                    {
                        motstandare.Attakera(spelare, spelet);
                    }
                }
                Console.WriteLine("Klicka enter för att fortsätta...");
                Console.ReadLine();
            }
            if (!spelare.dead && motstandare.dead && !avslutarSpelet)
            {
                //Spelarens hälsa återställs 
                spelare.befinnande = playerMaxbefinnande;

                //Spelaren ges gratismedelande
                Console.WriteLine(String.Format("Grattis, du döda {0}", motstandare.namn));
                spelet.LoggaDetta(String.Format("{0} dödade {1}", spelare.namn, motstandare.namn));

                //Max och Min Hälsa ökas med 10 HP
                spelet.minbefinnande += 10;
                spelet.maxbefinnande += 10;

                //loggar att runda är avklarad
                spelet.LoggaDetta(String.Format("Runda {0} avklarad", spelet.rundorAvklarade));
                spelet.rundorAvklarade += 1;
                
                //Ny motståndare läggs till
                motstandare = CharacterCreation(spelet);

                //Spelarens styrka randomizeras
                spelare.styrka = spelare.RullaTarningen();

                //Spara Spelet
                SaveGame(spelet, spelare, motstandare);

                //Ny runda
                Runda(spelare, motstandare, spelet);
            }
            if (spelare.dead && !motstandare.dead)
            {
                Console.WriteLine(String.Format("Det här verkar som slutet på resan för {0}, som stolt klarade sig i {1} rundor.", spelare.namn, spelet.rundorAvklarade - 1));
                spelet.LoggaDetta(String.Format("Spelaren dog vid runda {0}, spelet avslutas", spelet.rundorAvklarade - 1));
                File.Delete("spelare.xml");
                File.Delete("motstandare.xml");
                File.Delete("spelet.xml");
            }
        }

        static void SaveGame(Game spelet, Character spelare, Character motstandare)
        {
            spelet.LoggaDetta("Spelet sparades");
            SaveViaDataContractSerialization(spelet, "spelet.xml");   //Spara Spelet
            SaveViaDataContractSerialization(spelare, "spelare.xml");   //Spara Spelaren
            SaveViaDataContractSerialization(motstandare, "motstandare.xml");   //Spara Spelaren
            Console.WriteLine("Spelet har sparats!");
        }
        static Game LoadGame()
        {
            if (File.Exists("spelet.xml"))
            {
                Console.WriteLine("Laddar in spelet");
                return LoadViaDataContractSerialization<Game>("spelet.xml"); //Ladda in Spelet.
            }
            else
            {
                Console.WriteLine("Kan inte hitta något sparat spel!");
                return null;
            }
        }

        static void Main()
        {
            Character spelare;
            Game spelet;
            Character motstandare;
            if (!File.Exists("spelet.xml"))
            {
                // Skapa spelet
                spelet = new Game(30, 71, 1, 11, 1, "Startet av spelet");

                // Skapa spelaren
                Random rand = new Random();
                int sbefinnande = rand.Next(30, 101); //Hälsa, mellan 30 och 100.
                Console.WriteLine("Vad heter din spelare?");
                spelare = new Character(Console.ReadLine(), sbefinnande, 0, false, 1, rand.Next(1, 51), 0, 0); //Skapa Spelaren
                Console.WriteLine("Du kastar en tärning");
                spelare.styrka = spelare.RullaTarningen();
                SaveViaDataContractSerialization(spelare, "spelare.xml");   //Spara Spelaren
                spelare = null; //Spelaren "tas bort"
                spelare = LoadViaDataContractSerialization<Character>("spelare.xml"); //Ladda in spelare.
                Console.WriteLine(spelare.ToString()); //Visa spelaren
                
                //Skapa Motståndaren
                motstandare = CharacterCreation(spelet);

                //Spara spelet och dess karaktärer
                SaveGame(spelet, spelare, motstandare);
            }
            else
            {
                spelet = LoadGame();
                spelet.LoggaDetta("Laddade in spelet");
                spelare = LoadViaDataContractSerialization<Character>("spelare.xml"); //Ladda in spelare.
                if (spelare.dead == null)
                {
                    spelare.dead = false;
                }
                Console.WriteLine(spelare.ToString()); //Visa spelaren
                SaveViaDataContractSerialization(spelare, "spelare.xml");   //Spara Spelaren
                spelare = null; //Spelaren "tas bort"
                spelare = LoadViaDataContractSerialization<Character>("spelare.xml"); //Ladda in spelare.

                //Ladda in motståndaren
                motstandare = LoadViaDataContractSerialization<Character>("motstandare.xml"); //Ladda in spelare.
                if (motstandare.dead == null)
                {
                    motstandare.dead = false;
                }
                SaveViaDataContractSerialization(motstandare, "motstandare.xml");   //Spara Spelaren
                motstandare = null; //Spelaren "tas bort"
                motstandare = LoadViaDataContractSerialization<Character>("motstandare.xml"); //Ladda in spelare.
            }
            Runda(spelare, motstandare, spelet);
        }
    }
}