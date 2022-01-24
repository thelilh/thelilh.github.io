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
        public int pengar; //Pengar

        [DataMember]
        public int typ; //Typ! 0 = spelare, 1 = motståndare

        [DataMember]
        public bool dead; //Är spelaren död?

        public Character(string namn, int befinnande, int styrka, bool dead, int svard, int fart, int brostplat, int benskydd, int pengar, int typ)
        {
            this.namn = namn;
            this.befinnande = befinnande;
            this.styrka = styrka;
            this.dead = dead;
            this.svard = svard;
            this.fart = fart;
            this.brostplat = brostplat;
            this.benskydd = benskydd;
            this.pengar = pengar;
            this.typ = typ;
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

            if (offer.befinnande <= 0)
            {
                offer.dead = true;
                if (this.typ == 0)
                {
                    //Ge spelaren pengar för att ha dödat motståndaren
                    this.pengar += offer.pengar;
                    spelet.minPengar += 20;
                    spelet.maxPengar += 20;

                    //Spelaren ges gratismedelande
                    Console.WriteLine(String.Format("Grattis, du döda {0}", offer.namn));
                    spelet.LoggaDetta(String.Format("Spelaren dödade {0}, som hade på sig {1} pengar. Spelarens pengar är nu {2}.", offer.namn, offer.pengar, this.pengar));
                    Console.WriteLine(String.Format("Du hittade {0} pengar på {1}. Du har nu {2} pengar.", offer.pengar, offer.namn, this.pengar));

                    //Max och Min Hälsa ökas med 10 HP
                    spelet.minbefinnande += 10;
                    spelet.maxbefinnande += 10;
                }
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
        public int minPengar;

        [DataMember]
        public int maxPengar;

        [DataMember]
        public int minstyrka;

        [DataMember]
        public int maxstyrka;

        [DataMember]
        public int rundorAvklarade;

        [DataMember]
        public int kostnadSvard;

        [DataMember]
        public int kostnadBrostplat;

        [DataMember]
        public int kostnadBenskydd;

        [DataMember]
        public List<string> log = new List<string>();

        public Game(int minbefinnande, int maxbefinnande, int minstyrka, int maxstyrka, int rundorAvklarade, string text, int minPengar, int maxPengar, int kostnadSvard, int kostnadBrostplat, int kostnadBenskydd)
        {
            this.minbefinnande = minbefinnande;
            this.maxbefinnande = maxbefinnande;
            this.minstyrka = minstyrka;
            this.maxstyrka = maxstyrka;
            this.rundorAvklarade = rundorAvklarade;
            this.log.Add(text);
            this.minPengar = minPengar;
            this.maxPengar = maxPengar;
            this.kostnadBenskydd = kostnadBenskydd;
            this.kostnadBrostplat = kostnadBrostplat;
            this.kostnadSvard = kostnadSvard;
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
            Character motstandare = new Character(namn[rNamn], sbefinnande, 0, false, 1, rand.Next(1, 51), 0, 0, rand.Next(spelet.minPengar, spelet.maxPengar), 1); 

            //Modifiera styrkan
            motstandare.styrka = motstandare.RullaTarningen();

            //Spara motståndaren
            SaveViaDataContractSerialization(motstandare, "motstandare.xml");   //Spara Motståndaren

            //Ge tillbaka motståndaren till spelet
            return motstandare;
        }

        static void Runda(Character spelare, Character motstandare, Game spelet)
        {
            //Rensa skärmen
            Console.Clear();

            //Logga rundan
            spelet.LoggaDetta(String.Format("Runda {0}", spelet.rundorAvklarade));

            //Temporära varaiblar
            int spelareMaxbefinnande = spelare.befinnande;
            int mMaxbefinnande = motstandare.befinnande;
            bool avslutarSpelet = false;

            //Skriv ut vem spelaren möter
            Console.WriteLine(String.Format("{0} möter {1}. Du har en hälsa av {2} och en styrka på {3}, motståndaren har en hälsa på {4}.", spelare.namn, motstandare.namn, spelare.befinnande, spelare.styrka, motstandare.befinnande));
            if (spelare.fart > motstandare.fart)
            {
                Console.WriteLine("Du är snabbare än din motståndare");
            }
            else
            {
                Console.WriteLine("Du är långsammare än din motståndare");
            }
            Console.WriteLine("Klicka enter för att fortsätta...");
            Console.ReadLine();

            //Börjar while-loopen, se till att den bara följs så länge både spelaren inte är död, motståndaren inte är död och spelaren inte valt att avsluta spelet.
            while (!spelare.dead && !motstandare.dead && !avslutarSpelet)
            {
                Console.Clear();
                Console.WriteLine(String.Format("Din hälsa: {0}/{1}", spelare.befinnande, spelareMaxbefinnande));
                Console.WriteLine(String.Format("{0}s hälsa: {1}/{2}", motstandare.namn, motstandare.befinnande, mMaxbefinnande));

                //Är spelare snabbare än motståndare eller lika snabb som motståndare, så går spelaren först
                if (spelare.fart>motstandare.fart || spelare.fart==motstandare.fart) { 
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
                }
                //Om motståndaren är snabbare än spelare, så går motståndaren först
                else
                {
                    if (!avslutarSpelet)
                    {
                        if (motstandare.befinnande > 0)
                        {
                            motstandare.Attakera(spelare, spelet); //Attakera spelaren
                        }
                    }
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
                            spelare.dead = true;
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
                }
                Console.WriteLine("Klicka enter för att fortsätta...");
                Console.ReadLine();
            }
            if (!spelare.dead && motstandare.dead && !avslutarSpelet)
            {
                //Spelarens hälsa återställs 
                spelare.befinnande = spelareMaxbefinnande;

                //loggar att runda är avklarad
                spelet.LoggaDetta(String.Format("Runda {0} avklarad", spelet.rundorAvklarade));
                spelet.rundorAvklarade += 1;
                
                //Ny motståndare läggs till
                motstandare = CharacterCreation(spelet);

                //Spelarens styrka randomizeras
                spelare.styrka = spelare.RullaTarningen();

                //Spara Spelet
                SaveGame(spelet, spelare, motstandare);

                //Starta shoppen
                Console.WriteLine("Du ser en trevlig affär");
                bool spelareShop = true;
                int shopId = 0;
                while (spelareShop)
                {
                    if (shopId == 0)
                    {
                        Console.WriteLine("1) Gå in i affären");
                        Console.WriteLine("2) Gå till nästa runda");
                        Console.WriteLine("3) Avsluta och spara");
                        Console.Write("\r\nVad vill du göra? ");
                        switch (Console.ReadLine())
                        {
                            case "1":
                                shopId = 1;
                                break;
                            case "2":
                                spelareShop = false;
                                break;
                            case "3":
                                spelareShop = false;
                                avslutarSpelet = true;
                                SaveGame(spelet, spelare, motstandare);
                                break;
                            default:
                                spelareShop = false;
                                break;
                        }
                    }
                    else if (shopId == 1)
                    {
                        Console.WriteLine(String.Format("Du har {0} pengar", spelare.pengar));
                        Console.WriteLine(String.Format("1) Uppgradera svärd (kostar {0})", spelet.kostnadSvard));
                        if (spelare.brostplat == 0) {
                            Console.WriteLine(String.Format("2) Köp bröstplåt (kostar {0})", spelet.kostnadBrostplat));
                        }
                        else { 
                            Console.WriteLine(String.Format("2) Uppgradera bröstplåt (kostar {0})", spelet.kostnadBrostplat));
                        }
                        if (spelare.benskydd == 0)
                        {
                            Console.WriteLine(String.Format("3) Köp benskydd (kostar {0})", spelet.kostnadBenskydd));
                        }
                        else
                        {
                            Console.WriteLine(String.Format("3) Uppgradera benskydd(kostar {0})", spelet.kostnadBenskydd));
                        }
                        Console.WriteLine("4) Gå ut ur affären");
                        Console.Write("\r\nVad vill du göra? ");
                        switch (Console.ReadLine())
                        {
                            case "1":
                                if (spelare.pengar >= spelet.kostnadSvard) {
                                    spelare.svard += 1;
                                    spelare.pengar -= spelet.kostnadSvard;
                                    spelet.kostnadSvard *= 2;
                                    Console.WriteLine(String.Format("Du har uppgraderat dit svärd till level {0}!\nNästa gång du handlar ett svärd kommer det kosta {1}.", spelare.svard, spelet.kostnadSvard));
                                    spelet.LoggaDetta(String.Format("Spelaren har nu svärd level {0} och {1} pengar", spelare.brostplat, spelare.pengar));
                                    SaveGame(spelet, spelare, motstandare);
                                }
                                else
                                {
                                    Console.WriteLine(String.Format("Tyvärr, det kostar {0} att uppgradera dit svärd, du har enbart {1}. Du behöver {2} fler pengar för att kunna köpa detta svärd.", spelet.kostnadSvard, spelare.pengar, spelet.kostnadSvard-spelare.pengar));
                                }
                                break;
                            case "2":
                                if (spelare.pengar >= spelet.kostnadBrostplat)
                                {
                                    spelare.brostplat += 1;
                                    spelare.pengar -= spelet.kostnadBrostplat;
                                    spelet.kostnadBrostplat *= 2;
                                    if (spelare.brostplat != 1) { 
                                        Console.WriteLine(String.Format("Du har uppgraderat dit bröstplåt till level {0}!\nNästa gång du handlar en bröstplåt kommer det kosta {1}.", spelare.brostplat, spelet.kostnadBrostplat));
                                    }
                                    else
                                    {
                                        Console.WriteLine(String.Format("Du har köpt en bröstplåt!\nNästa gång du handlar en bröstplåt kommer det kosta {0}.", spelet.kostnadBrostplat));
                                    }
                                    spelet.LoggaDetta(String.Format("Spelaren har nu bröstplåt level {0} och {1} pengar", spelare.brostplat, spelare.pengar));
                                    SaveGame(spelet, spelare, motstandare);
                                }
                                else
                                {
                                    if (spelare.brostplat != 0) { 
                                        Console.WriteLine(String.Format("Tyvärr, det kostar {0} att uppgradera din bröstplåt, du har enbart {1}. Du behöver {2} fler pengar för att kunna köpa denna bröstplåt.", spelet.kostnadBrostplat, spelare.pengar, spelet.kostnadBrostplat - spelare.pengar));
                                    }
                                    else
                                    {
                                        Console.WriteLine(String.Format("Tyvärr, det kostar {0} att köpa en bröstplåt, du har enbart {1}. Du behöver {2} fler pengar för att kunna köpa denna bröstplåt.", spelet.kostnadBrostplat, spelare.pengar, spelet.kostnadBrostplat - spelare.pengar));
                                    }
                                }
                                break;
                            case "3":
                                if (spelare.pengar >= spelet.kostnadBenskydd)
                                {
                                    spelare.benskydd += 1;
                                    spelare.pengar -= spelet.kostnadBenskydd;
                                    spelet.kostnadBenskydd *= 2;
                                    if (spelare.benskydd != 1)
                                    {
                                        Console.WriteLine(String.Format("Du har uppgraderat dit benskydd till level {0}!\nNästa gång du handlar ett benskydd kommer det kosta {1}.", spelare.benskydd, spelet.kostnadBenskydd));
                                    }
                                    else
                                    {
                                        Console.WriteLine(String.Format("Du har köpt ett benskydd!\nNästa gång du handlar ett benskydd kommer det kosta {0}.", spelet.kostnadBenskydd));
                                    }
                                    spelet.LoggaDetta(String.Format("Spelaren har nu benskydd level {0} och {1} pengar", spelare.benskydd, spelare.pengar));
                                    SaveGame(spelet, spelare, motstandare);
                                }
                                else
                                {
                                    if (spelare.benskydd != 0)
                                    {
                                        Console.WriteLine(String.Format("Tyvärr, det kostar {0} att uppgradera dina benskydd, du har enbart {1}. Du behöver {2} fler pengar för att kunna köpa dessa benskydd.", spelet.kostnadBenskydd, spelare.pengar, spelet.kostnadBenskydd - spelare.pengar));
                                    }
                                    else
                                    {
                                        Console.WriteLine(String.Format("Tyvärr, det kostar {0} att köpa benskydd, du har enbart {1}. Du behöver {2} fler pengar för att kunna köpa dessa benskydd.", spelet.kostnadBenskydd, spelare.pengar, spelet.kostnadBenskydd - spelare.pengar));
                                    }
                                }
                                break;
                            case "4":
                                shopId = 0;
                                break;
                            default:
                                shopId = 0;
                                break;
                        }
                    }
                }

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
            Console.WriteLine("Laddar in spelet");
            return LoadViaDataContractSerialization<Game>("spelet.xml"); //Ladda in Spelet.
        }

        static void Main()
        {
            //Variabler
            Character spelare;
            Game spelet;
            Character motstandare;

            //Finns ens spelet?
            if (!File.Exists("spelet.xml"))
            {
                // Skapa spelet
                spelet = new Game(30, 71, 1, 11, 1, "Startet av spelet", 10, 101, 100, 125, 150);

                // Viktiga variabler
                Random rand = new Random();
                int sbefinnande = rand.Next(30, 101); //Hälsa, mellan 30 och 100.

                //Fråga spelaren
                Console.WriteLine("Vad heter din spelare?");

                //Skapa spelaren
                spelare = new Character(Console.ReadLine(), sbefinnande, 0, false, 1, rand.Next(1, 51), 0, 0, 100, 0); //Skapa Spelaren

                //Rulla tärningen
                Console.WriteLine("Du kastar en tärning");
                spelare.styrka = spelare.RullaTarningen();

                //Spara spelaren och ladda in
                SaveViaDataContractSerialization(spelare, "spelare.xml");   //Spara Spelaren
                spelare = null; //Spelaren "tas bort"
                spelare = LoadViaDataContractSerialization<Character>("spelare.xml"); //Ladda in spelare.
                
                //Skapa Motståndaren
                motstandare = CharacterCreation(spelet);

                //Spara spelet och dess karaktärer
                SaveGame(spelet, spelare, motstandare);
            }
            else
            {
                //Spelet finns, ladda in spelet
                spelet = LoadGame();
                spelet.LoggaDetta("Laddade in spelet");

                //Ladda in spelare
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
            //Starta rundan
            Runda(spelare, motstandare, spelet);
        }
    }
}