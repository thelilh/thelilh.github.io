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
        public int health; //Hälsa!

        [DataMember]
        public int strength; //Styrka!

        [DataMember]
        public bool isDead; //Är spelaren död?

        public Character(string namn, int health, int strength, bool isDead)
        {
            this.namn = namn;
            this.health = health;
            this.strength = strength;
            this.isDead = isDead;
        }
        public override string ToString()
        {
            string returnString = namn + " har en hälsa av " + health + ", en styrka på " + strength;
            return returnString;
        }
        public int TakeDmg(int dmg)
        {
            int temp = this.health - dmg;
            return temp;
        }
        public bool CheckIfDead()
        {
            if (this.health <= 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public int RollTheDice()
        {
            Random random = new Random();
            return random.Next(1, 7); //Mellan 1 och 6.
        }
    }
    [DataContract]
    public class Game
    {
        [DataMember]
        public int minhealth;

        [DataMember]
        public int maxhealth;

        [DataMember]
        public int minstrength;

        [DataMember]
        public int maxstrength;

        [DataMember]
        public int rundorAvklarade;

        [DataMember]
        public List<string> log = new List<string>();

        public Game(int minhealth, int maxhealth, int minstrength, int maxstrength, int rundorAvklarade, string text)
        {
            this.minhealth = minhealth;
            this.maxhealth = maxhealth;
            this.minstrength = minstrength;
            this.maxstrength = maxstrength;
            this.rundorAvklarade = rundorAvklarade;
            this.log.Add(text);
        }

        public void LogThisForMe(string text)
        {
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
            int sHealth = rand.Next(spelet.minhealth, spelet.maxhealth); //Hälsa, mellan 1 och 100.
            int rNamn = rand.Next(1, namn.Length);
            Character motstandare = new Character(namn[rNamn], sHealth, 0, false); //Skapa Motståndaren
            motstandare.strength = motstandare.RollTheDice();
            SaveViaDataContractSerialization(motstandare, "motstandare.xml");   //Spara Motståndaren
            return motstandare;
        }

        static void BattleMode(Character spelare, Character motstandare, Game spelet)
        {
            spelet.LogThisForMe(String.Format("Runda {0}", spelet.rundorAvklarade));
            int playerMaxHealth = spelare.health;
            bool avslutarSpelet = false;
            Console.WriteLine(String.Format("{0} möter {1}. Du har en hälsa av {2} och en styrka på {3}, motståndaren har en hälsa på {4}.", spelare.namn, motstandare.namn, spelare.health, spelare.strength, motstandare.health));
            while (!spelare.isDead && !motstandare.isDead && !avslutarSpelet)
            {
                Console.WriteLine(String.Format("Din hälsa: {0}", spelare.health));
                Console.WriteLine(String.Format("{0}s hälsa: {1}", motstandare.namn, motstandare.health));
                Console.WriteLine("1) Attakera");
                Console.WriteLine("2) Ge upp");
                Console.WriteLine("3) Avsluta och spara");
                Console.WriteLine("Tomt: Slumpmässigt");
                Console.Write("\r\nVad vill du göra? ");
                switch (Console.ReadLine())
                {
                    case "1":
                        motstandare.health = motstandare.TakeDmg(spelare.strength);
                        Console.WriteLine(String.Format("{0} slog {2}. {2} tog {1} skada.", spelare.namn, spelare.strength, motstandare.namn));
                        spelet.LogThisForMe(String.Format("{2} skades av {0} ({1} skada).", spelare.namn, spelare.strength, motstandare.namn));
                        break;
                    case "2":
                        spelare.health = spelare.TakeDmg(spelare.health);
                        spelare.isDead = true;
                        avslutarSpelet = true;
                        break;
                    case "3":
                        Console.WriteLine(String.Format("Det verkar som att {0} vill ta en paus. Än så länge har {0} klarat sig i {1} rundor.", spelare.namn, spelet.rundorAvklarade));
                        spelet.LogThisForMe(String.Format("Spelet avslutades vid runda {0} av spelaren.", spelet.rundorAvklarade));
                        motstandare.health = motstandare.TakeDmg(motstandare.health);
                        avslutarSpelet = true;
                        SaveGame(spelet, spelare);
                        break;
                    default:
                        break;
                }
                if (!avslutarSpelet)
                {
                    if (motstandare.health > 0)
                    {
                        spelare.health = spelare.TakeDmg(motstandare.strength);
                        Console.WriteLine(String.Format("{0} slog {2}. {2} tog {1} skada.", motstandare.namn, motstandare.strength, spelare.namn));
                        spelet.LogThisForMe(String.Format("{2} skades av {0} ({1} skada).", motstandare.namn, motstandare.strength, spelare.namn));
                    }
                    spelare.isDead = spelare.CheckIfDead();
                    motstandare.isDead = motstandare.CheckIfDead();
                }
            }
            if (!spelare.isDead && motstandare.isDead && !avslutarSpelet)
            {
                spelare.health = playerMaxHealth;
                Console.WriteLine(String.Format("Grattis, du döda {0}", motstandare.namn));
                spelet.LogThisForMe(String.Format("{0} dödade {1}", spelare.namn, motstandare.namn));
                spelet.minhealth += 10;
                spelet.maxhealth += 10;
                spelet.LogThisForMe(String.Format("Runda {0} avklarad", spelet.rundorAvklarade));
                spelet.rundorAvklarade += 1;
                motstandare = CharacterCreation(spelet);
                spelare.strength = spelare.RollTheDice();
                SaveGame(spelet, spelare);
                BattleMode(spelare, motstandare, spelet);
            }
            if (spelare.isDead && !motstandare.isDead)
            {
                Console.WriteLine(String.Format("Det här verkar som slutet på resan för {0}, som stolt klarade sig i {1} rundor.", spelare.namn, spelet.rundorAvklarade - 1));
                spelet.LogThisForMe(String.Format("Spelaren dog vid runda {0}, spelet avslutas", spelet.rundorAvklarade - 1));
                File.Delete("spelare.xml");
                File.Delete("motstandare.xml");
                File.Delete("spelet.xml");
            }
        }

        static void SaveGame(Game spelet, Character spelare)
        {
            spelet.LogThisForMe("Spelet sparades");
            SaveViaDataContractSerialization(spelet, "spelet.xml");   //Spara Spelet
            SaveViaDataContractSerialization(spelare, "spelare.xml");   //Spara Spelaren
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
            if (!File.Exists("spelare.xml"))
            {
                // Spara objektet
                Random rand = new Random();
                int sHealth = rand.Next(30, 101); //Hälsa, mellan 30 och 100.
                Console.WriteLine("Vad heter din spelare?");
                spelare = new Character(Console.ReadLine(), sHealth, 0, false); //Skapa Spelaren
                Console.WriteLine("Du kastar en tärning");
                spelare.strength = spelare.RollTheDice();
                SaveViaDataContractSerialization(spelare, "spelare.xml");   //Spara Spelaren
                spelare = null; //Spelaren "tas bort"
                spelare = LoadViaDataContractSerialization<Character>("spelare.xml"); //Ladda in spelare.
                Console.WriteLine(spelare.ToString()); //Visa spelaren
            }
            else
            {
                spelare = LoadViaDataContractSerialization<Character>("spelare.xml"); //Ladda in spelare.
                if (spelare.isDead == null)
                {
                    spelare.isDead = false;
                    SaveViaDataContractSerialization(spelare, "spelare.xml");   //Spara Spelaren
                    spelare = null; //Spelaren "tas bort"
                    spelare = LoadViaDataContractSerialization<Character>("spelare.xml"); //Ladda in spelare.
                }
                Console.WriteLine(spelare.ToString()); //Visa spelaren
            }
            Game spelet;
            if (!File.Exists("spelet.xml"))
            {
                spelet = new Game(30, 101, 1, 11, 1, "Startet av spelet");
                SaveGame(spelet, spelare);
            }
            else
            {
                spelet = LoadGame();
                spelet.LogThisForMe("Laddade in spelet");
            }
            Character motstandare;
            //Om det inte finns en fil med namnet "motstandare.xml", skapa en ny motståndare.
            if (!File.Exists("motstandare.xml"))
            {
                motstandare = CharacterCreation(spelet);
            }
            //Om det finns en fil med namnet "motstandare.xml", ladda in den motståndare.
            else
            {
                motstandare = LoadViaDataContractSerialization<Character>("motstandare.xml");
            }
            BattleMode(spelare, motstandare, spelet);
        }
    }
}