using System;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;

namespace Lexicon
{

    [DataContract]
    public class Spelare
    {
        [DataMember]
        public string namn; //Namn!

        [DataMember]
        public int health; //Hälsa!

        [DataMember]
        public int strength; //Styrka!

        [DataMember]
        public int luck; //Tur!

        public Spelare(string namn, int health, int strength, int luck)
        {
            this.namn = namn;
            this.health = health;
            this.strength = strength;
            this.luck = luck;
        }
        public override string ToString()
        {
            string returnString = namn + " har en hälsa av " + health + ", en styrka på " + strength + " och en tur på " + luck;
            return returnString;
        }
    }

    [DataContract]
    public class Motstandare
    {
        [DataMember]
        public string namn; //Namn!

        [DataMember]
        public int health; //Hälsa!

        [DataMember]
        public int strength; //Styrka!

        [DataMember]
        public int luck; //Tur!

        public Motstandare(string namn, int health, int strength, int luck)
        {
            this.namn = namn;
            this.health = health;
            this.strength = strength;
            this.luck = luck;
        }
        public override string ToString()
        {
            string returnString = namn + " har en hälsa av " + health + ", en styrka på " + strength + " och en tur på " + luck;
            return returnString;
        }
    }
    class LexiconLearning
    {
        //Publika variabler
        public static bool isColor;
        static void HelloWorld()
        {
            // Funktion som skriver ut "Hello World" i konsolen
            Console.WriteLine("Hello World");
            Thread.Sleep(2000); //Låt användaren läsa i 2 sekunder innan skärmen rensas
        }
        static void FirstLastAge()
        {
            // Funktion som tar in input från användaren (Förnamn, Efternamn, Ålder) och sedan skriver ut dessa i konsolen
            // Skriv in ditt namn
            Console.WriteLine("Skriv in ditt förnamn:");
            // Skapa variablen "förnamn" (firstname) från använderens input
            string? firstname = Console.ReadLine();
            // Skriv in ditt efternamn
            Console.WriteLine("Skriv in ditt efternamn:");
            // Skapa variablen "efternamn" (lastname) från använderens input
            string? lastname = Console.ReadLine();
            // Skriv in din ålder
            Console.WriteLine("Skriv in din ålder:");
            // Skapa variablen "ålder" (age) från använderens input
            string? age = Console.ReadLine();
            Console.WriteLine(String.Format("Hej, {0} {1}, du är {2} år gammal!", firstname, lastname, age));
            Thread.Sleep(2000); //Låt användaren läsa i 2 sekunder innan skärmen rensas
        }
        static void ColorChanger()
        {
            if (isColor)
            {
                Console.ForegroundColor = ConsoleColor.White;
                Console.WriteLine("Färgen är nu vit");
                isColor = false;
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Blue;
                Console.WriteLine("Färgen är nu blå");
                isColor = true;
            }
            Thread.Sleep(2000); //Låt användaren läsa i 2 sekunder innan skärmen rensas
        }
        static void DagensDatum()
        {
            // Vad är ens dagens datum? Vi måste hämta det från DateTime!
            DateTime dagensDatum = DateTime.Today;
            // Himla bra, vi har dagens datum, nu ska vi göra ge den till användaren!
            Console.WriteLine(String.Format("Dagens datum är: {0}",dagensDatum.ToString("D")));
            Thread.Sleep(2000); //Låt användaren läsa i 2 sekunder innan skärmen rensas
        }
        static void VadArStorst()
        {
            // Användaren måste skriva in ints, annars går det ej!
            bool harNummer1 = false;
            int nummer1b = 0;
            int nummer2b = 0;
            while (!harNummer1) { 
                // Vi måste först få två nummer från användaren
                Console.WriteLine("Skriv in ett nummer:");
                // Skapa variablen nummer1 från använderens input
                string? nummer1 = Console.ReadLine();
                if (int.TryParse(nummer1, out _))
                {
                    nummer1b = int.Parse(nummer1, NumberStyles.AllowLeadingWhite | NumberStyles.AllowTrailingWhite);
                    harNummer1 = true;
                }
                else
                {
                    Console.WriteLine("Tyvärr, det där är inte ett nummmer. Försök igen!");
                }
            }
            bool harNummer2 = false;
            while (!harNummer2)
            {
                // Himla bra, vi har nu fått ett nummer, dags för det andra!
                Console.WriteLine("Skriv in ett annat nummer:");
                // Skapa variablen nummer2 från använderens input
                string? nummer2 = Console.ReadLine();
                if (int.TryParse(nummer2, out _))
                {
                    nummer2b = int.Parse(nummer2, NumberStyles.AllowLeadingWhite | NumberStyles.AllowTrailingWhite);
                    harNummer2 = true;
                }
                else
                {
                    Console.WriteLine("Tyvärr, det där är inte ett nummmer. Försök igen!");
                }
            }
            if (nummer1b>nummer2b)
            {
                Console.WriteLine(String.Format("{0} är större än {1}",nummer1b,nummer2b));
            }
            else if (nummer1b < nummer2b)
            {
                Console.WriteLine(String.Format("{1} är större än {0}", nummer1b, nummer2b));
            }
            else
            {
                Console.WriteLine(String.Format("{0} är samma nummer som {1}", nummer1b, nummer2b));
            }
            Thread.Sleep(2000); //Låt användaren läsa i 2 sekunder innan skärmen rensas
        }
        static void GissaNummer()
        {
            Console.WriteLine("Välkommen till GissaNummer, jag är din host C#. Spelet är enkelt, gissa ett nummer mellan 1 och 100 tills du gissar rätt!");
            bool harGissatNumret = false;
            Random rand = new Random();
            int nummer = rand.Next(1, 101); //Även fast det står 101 betyder det 100... kodning är konstigt i bland :/
            while (!harGissatNumret)
            {
                int nummer1b;
                Console.WriteLine("Skriv in ett nummer mellan 1 och 100: ");
                // Skapa variablen nummer1 från använderens input
                string? nummer1 = Console.ReadLine();
                if (int.TryParse(nummer1, out _))
                {
                    nummer1b = int.Parse(nummer1, NumberStyles.AllowLeadingWhite | NumberStyles.AllowTrailingWhite);
                    if (nummer1b == nummer)
                    {
                        Console.WriteLine(String.Format("Du gissade rätt! Numret var {0}", nummer));
                        harGissatNumret = true;
                    }
                    else
                    {
                        if (nummer1b > nummer)
                        {
                            Console.WriteLine(String.Format("Du gissade {0}, det är för högt!", nummer1b));
                        }
                        else if (nummer1b < nummer)
                        {
                            Console.WriteLine(String.Format("Du gissade {0}, det är för lågt!", nummer1b));
                        }
                    }
                }
                else
                {
                    Console.WriteLine("Tyvärr, det där är inte ett nummmer. Försök igen!");
                }
            }
            Thread.Sleep(2000); //Låt användaren läsa i 2 sekunder innan skärmen rensas
        }

        static void SkrivTillFil()
        {
            //Vad ska skrivas i filen?
            string strPath = Environment.GetFolderPath(System.Environment.SpecialFolder.DesktopDirectory) + "\\LeixcronHannah.txt";
            Console.WriteLine("Detta program kommer att skriva en fil till ditt skrivbord, om du ej vill att detta ska göras så kan du gå ur funktionen");
            Console.WriteLine("Skriv något!");
            // Skapa filen med innehåll, eller lägg till innehållet i filen om den redan finns!
            if (!File.Exists(strPath)) { 
                using (StreamWriter sw = File.CreateText(strPath))
                {
                    sw.WriteLine(Console.ReadLine());
                }
            }
            else
            {
                using (StreamWriter sw = File.AppendText(strPath))
                {
                    sw.WriteLine(Console.ReadLine());
                }
            }
            Console.WriteLine(String.Format("Sparade din text till {0}",strPath));
            Thread.Sleep(4000); //Låt användaren läsa i 4 sekunder innan skärmen rensas
        }
        static void LasFranFil()
        {
            //Läs Från Fil
            //Först måste vi kolla om den ens finns!
            string strPath = Environment.GetFolderPath(System.Environment.SpecialFolder.DesktopDirectory) + "\\LeixcronHannah.txt";
            if (!File.Exists(strPath))
            {
                Console.WriteLine("Filen finns ej, använd funktion 7 innan du använder denna funktion!");
            }
            else
            {
                Console.WriteLine("Filen hittades, skriver ut vad som finns i den!");
                string texten = File.ReadAllText(strPath);
                Console.WriteLine(texten);
            }
            Thread.Sleep(4000); //Låt användaren läsa i 4 sekunder innan skärmen rensas
        }
        static void MatteMatik()
        {
            // Användaren måste skriva in ints, annars går det ej!
            bool harNummer = false;
            double nummerB = 0;
            while (!harNummer)
            {
                // Vi måste först få två nummer från användaren
                Console.WriteLine("Skriv in ett decimaltal:");
                // Skapa variablen nummer från använderens input
                string? nummer = Console.ReadLine();
                if (double.TryParse(nummer, out _))
                {
                    nummerB = Convert.ToDouble(nummer);
                    if ((nummerB % 1) > 0)
                    {
                        harNummer = true;
                    }
                    else
                    {
                        Console.WriteLine("Medans det är ett nummer, så är det inte ett decimaltal");
                    }
                }
                else
                {
                    Console.WriteLine("Tyvärr, det där är inte ett nummmer. Försök igen!");
                }
            }
            Console.WriteLine(String.Format("Numret du har skrivit in är {0}, vilket har en rot av {1}. Om vi tar upphöjt med två får vi {2} samt upphöjt med tio får vi {3}", nummerB, Math.Sqrt(nummerB), Math.Pow(nummerB, 2), Math.Pow(nummerB, 10)));
            Thread.Sleep(2000); //Låt användaren läsa i 2 sekunder innan skärmen rensas
        }

        static void MatteMatik2()
        {
            //Börja med att skapa en array
            int[][] tabb = new int[11][];
            tabb[0] = new int[11];
            tabb[1] = new int[11];
            tabb[2] = new int[11];
            tabb[3] = new int[11];
            tabb[4] = new int[11];
            tabb[5] = new int[11];
            tabb[6] = new int[11];
            tabb[7] = new int[11];
            tabb[8] = new int[11];
            tabb[9] = new int[11];
            tabb[10] = new int[11];
            //Dags för själva matten, läg in den rätt nu också!
            for (int i = 1; i < 11; i++)
            {
                for (int y = 1; y < 11; y++) {
                    int x = i * y;
                    tabb[i][y] = x;
                }
            }
            //Nu ska vi visa, börja med första raden, dvs 1 och fortså vidare. Hoppa över noll, noll gånger något är alltid noll!
            for (int i = 1; i < tabb.Length; i++)
            {
                //Skriv ut varje siffra i tabell, men kom ihåg att göra en "tabb" mellan varandra!
                for (int j = 1; j < tabb[i].Length; j++)
                {
                    System.Console.Write("{0}{1}", tabb[i][j], j == (tabb[i].Length - 1) ? "" : "\t");
                }
                System.Console.WriteLine();
            }
            //Himla bra, allt fungerar!
            Thread.Sleep(5000); //Låt användaren läsa i 5 sekunder innan skärmen rensas
        }

        static void RandomSortering()
        {
            //Först måste vi skapa själva arrayerna, självfallet!
            int[] massaTal = new int[10];
            int[] SorteradeTal = new int[10];
            for (int i = 0; i < massaTal.Length; i++)
            {
                Random rand = new Random();
                massaTal[i] = rand.Next(1, 101); //Random nummer mellan 1 och 100, för enkelhetens skull!
            }
            Console.WriteLine("Nu har programmet randomiserat en array!");
            //Visa upp att den fungerar!
            foreach (var item in massaTal)
            {
                Console.WriteLine(item);
            }
            //Dags att sortera, det är ju enkelt! Använder bara Array.Sort()... vänta nej, det får jag inte!
            //KAPOW, egen sorterare!
            //Börja med att starta att gå igenom listan
            int temp = 0; //mycket viktig, du ska hålla kolla för oss!
            SorteradeTal = massaTal;
            for (int i = 0; i <= SorteradeTal.Length-1; i++)
            {
                for (int j = i+1; j < SorteradeTal.Length; j++)
                {
                    if (SorteradeTal[i] > SorteradeTal[j])
                    {
                        temp = SorteradeTal[i];
                        SorteradeTal[i] = SorteradeTal[j];
                        SorteradeTal[j] = temp;

                    }
                }
            }
            Console.WriteLine("Nu har programmet sorterat talen!");
            //Visa upp att den fungerar!
            foreach (var item in SorteradeTal)
            {
                Console.WriteLine(item);
            }   
            //Himla bra, allt fungerar!
            Thread.Sleep(5000); //Låt användaren läsa i 5 sekunder innan skärmen rensas
        }

        static void Palindrom()
        {
            //Ta använder input
            Console.WriteLine("Skriv in ett ord:");
            string? palindromet = Console.ReadLine();

            //Gör om det till ett array
            char[] palindromArray = palindromet.ToCharArray();

            //Gör så att den ligger i motsatt håll
            Array.Reverse(palindromArray);

            //Gör om array till en string
            string? temp = new string(palindromArray);

            //Är det ett palindrom?
            if (palindromet.ToLower() == temp.ToLower())
            {
                //Ja, det är det faktiskt
                Console.WriteLine(String.Format("{0} är ett palindrom!",palindromet));
            }
            else
            {
                //Nej, tyvärr inte
                Console.WriteLine(String.Format("{0} är inte ett palindrom!", palindromet));
            }
            Thread.Sleep(2000); //Låt användaren läsa i 2 sekunder innan skärmen rensas
        }
        static void MellanTvaTal()
        {
            //Mellan Två Tall!
            // Användaren måste skriva in ints, annars går det ej!
            bool harNummer1 = false;
            int nummer1b = 0;
            int nummer2b = 0;
            while (!harNummer1)
            {
                // Vi måste först få två nummer från användaren
                Console.WriteLine("Skriv in ett nummer:");
                // Skapa variablen nummer1 från använderens input
                string? nummer1 = Console.ReadLine();
                if (int.TryParse(nummer1, out _))
                {
                    nummer1b = int.Parse(nummer1, NumberStyles.AllowLeadingWhite | NumberStyles.AllowTrailingWhite);
                    harNummer1 = true;
                }
                else
                {
                    Console.WriteLine("Tyvärr, det där är inte ett nummmer. Försök igen!");
                }
            }
            bool harNummer2 = false;
            while (!harNummer2)
            {
                // Himla bra, vi har nu fått ett nummer, dags för det andra!
                Console.WriteLine("Skriv in ett annat nummer:");
                // Skapa variablen nummer2 från använderens input
                string? nummer2 = Console.ReadLine();
                if (int.TryParse(nummer2, out _))
                {
                    nummer2b = int.Parse(nummer2, NumberStyles.AllowLeadingWhite | NumberStyles.AllowTrailingWhite);
                    harNummer2 = true;
                }
                else
                {
                    Console.WriteLine("Tyvärr, det där är inte ett nummmer. Försök igen!");
                }
            }
            if (nummer1b>nummer2b)
            {
                Console.WriteLine(String.Format("Här är alla nummer mellan {0} och {1}:", nummer2b, nummer1b));
                for (int i =nummer2b+1; i<nummer1b; i++)
                {
                    Console.WriteLine(i.ToString());
                }
            }
            else
            {
                Console.WriteLine(String.Format("Här är alla nummer mellan {1} och {0}:", nummer2b, nummer1b));
                for (int i = nummer1b+1; i < nummer2b; i++)
                {
                    Console.WriteLine(i.ToString());
                }

            }
            Thread.Sleep(2000); //Låt användaren läsa i 2 sekunder innan skärmen rensas
        }
    
        static void SorteraUddaJamn()
        {
            //Sortera Udda och Jämna tal från en använder input
            // Himla bra, vi har nu fått ett nummer, dags för det andra!
            Console.WriteLine("Skriv in några tal, kom ihåg att seperera dem med kommatecken:");
            string? nummer = Console.ReadLine();
            string[] temp = nummer.Split(",");
            int[] numArray = new int[temp.Length];
            int y = 0;
            for (int i = 0; i < temp.Length; i++)
            {
                if (int.TryParse(temp[i], out _))
                {
                    numArray[y] = int.Parse(temp[i], NumberStyles.AllowLeadingWhite | NumberStyles.AllowTrailingWhite);
                    y++;
                }
            }
            int[] uddaArray = new int[numArray.Length];
            int[] jamnaArray = new int[numArray.Length];
            //Sortera först
            int temp2 = 0; //mycket viktig, du ska hålla kolla för oss!
            for (int i = 0; i <= numArray.Length - 1; i++)
            {
                for (int j = i + 1; j < numArray.Length; j++)
                {
                    if (numArray[i] > numArray[j])
                    {
                        temp2 = numArray[i];
                        numArray[i] = numArray[j];
                        numArray[j] = temp2;

                    }
                }
            }
            //Är det udda eller jämnt?
            int u = 0;
            int v = 0;
            for (int i= 0; i<numArray.Length; i++)
            {
                //Vi använder os av module för att se om talet är udda eller jämnt. Om talet module 2 är 0 är det jämnt, om talet module 2 inte är 0 är det udda.
                if ((numArray[i]%2)==0)
                {
                    //Lägg till det i den jämna arrayen
                    jamnaArray[v] = numArray[i];
                    v++;
                }
                else
                {
                    //Lägg till det i den udda arrayen
                    uddaArray[u] = numArray[i];
                    u++;
                }
            }
            Array.Resize(ref jamnaArray, v);
            Array.Resize(ref uddaArray, u);
            Console.WriteLine("Här är alla dina nummer:");
            foreach (int i in numArray)
            {
                Console.WriteLine(i.ToString());
            }
            Console.WriteLine("Här är dina udda nummer:");
            foreach (int i in uddaArray)
            {
                Console.WriteLine(i.ToString());
            }
            Console.WriteLine("Här är dina jämna nummer:");
            foreach (int i in jamnaArray)
            {
                Console.WriteLine(i.ToString());
            }
            Thread.Sleep(4000); //Låt användaren läsa i 2 sekunder innan skärmen rensas
        }

        static void AdderaAllaNummer()
        {
            //Sortera Udda och Jämna tal från en använder input
            // Himla bra, vi har nu fått ett nummer, dags för det andra!
            Console.WriteLine("Skriv in några tal, kom ihåg att seperera dem med kommatecken:");
            string? nummer = Console.ReadLine();
            string[] temp = nummer.Split(",");
            int[] numArray = new int[temp.Length];
            int y = 0;
            for (int i = 0; i < temp.Length; i++)
            {
                if (int.TryParse(temp[i], out _))
                {
                    numArray[y] = int.Parse(temp[i], NumberStyles.AllowLeadingWhite | NumberStyles.AllowTrailingWhite);
                    y++;
                }
            }
            int temp2 = 0;
            foreach(int i in numArray)
            {
                temp2 += i;
            }
            Console.WriteLine(String.Format("Summan av de termerna du har skrivit in är {0}",temp2));
            Thread.Sleep(2000); //Låt användaren läsa i 2 sekunder innan skärmen rensas
        }
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

        static void SpelareOchMotstandare()
        {
            // Spara objektet
            Random rand = new Random();
            int sHealth = rand.Next(1, 101); //Hälsa, mellan 1 och 100.
            int sStrength = rand.Next(1, 101); //Styrka, mellan 1 och 100.
            int sLuck = rand.Next(1, 101); //Tur, mellan 1 och 100.
            Console.WriteLine("Vad heter din spelare?");
            Spelare spelare = new Spelare(Console.ReadLine(), sHealth, sStrength, sLuck); //Skapa Spelaren
            SaveViaDataContractSerialization(spelare, "spelare.xml");   //Spara Spelaren
            spelare = null; //Spelaren "tas bort"
            spelare = LoadViaDataContractSerialization<Spelare>("spelare.xml"); //Ladda in spelare.
            Console.WriteLine(spelare.ToString()); //Visa spelaren

            int mHealth = rand.Next(1, 101); //Hälsa, mellan 1 och 100.
            int mStrength = rand.Next(1, 101); //Styrka, mellan 1 och 100.
            int mLuck = rand.Next(1, 101); //Tur, mellan 1 och 100.
            Console.WriteLine("Vad heter din motståndare?");
            Motstandare motstandare = new Motstandare(Console.ReadLine(), mHealth, mStrength, mLuck); //Skapa Motståndaren
            SaveViaDataContractSerialization(motstandare, "motstandare.xml");   //Spara Motståndaren
            motstandare = null; //Motståndaren "tas bort"
            motstandare = LoadViaDataContractSerialization<Motstandare>("motstandare.xml"); //Ladda in Motståndaren.
            Console.WriteLine(motstandare.ToString()); //Visa Motståndaren
            Thread.Sleep(4000); //Låt användaren läsa i 4 sekunder innan skärmen rensas
        }
        static void Main()
        {
            bool visaMeny = true;
            while (visaMeny)
            {
                visaMeny = Meny();
            }
        }
        private static bool Meny()
        {
            //Meny funktion, som på beställning!
            Console.Clear(); //Rensa skärmen, vi vill enbart att detta skrivs ut!
            Console.WriteLine("Välj en funktion från nedanför:");
            Console.WriteLine("1) Funktion som skriver ut ”Hello World” i konsolen");
            Console.WriteLine("2) Funktion som tar in input från användaren (Förnamn, Efternamn, Ålder) och sedan skriver ut dessa i konsolen");
            Console.WriteLine("3) Funktion som ändrar färgen på texten i konsolen (och ändrar tillbaka om man använder funktionen igen");
            Console.WriteLine("4) Funktion för att skriva ut dagens datum");
            Console.WriteLine("5) Funktion som tar två input värden, sedan skriver ut vilket av dem som är störst."); 
            Console.WriteLine("6) Funktion som genererar att slumpmässigt tal mellan 1 och 100. Användaren ska sedan gissa talet. Gissar användaren rätt så ska ett meddelande sägadetta, samt hur många försök det tog. Gissar användaren fel ska ett meddelande visas som informerar ifall talet var för stort eller för litet");
            Console.WriteLine("7) Funktion där användaren skriver in en textrad, som sedan sparas i en fil på hårddisken");
            Console.WriteLine("8) Funktion där en fil läses in från hårddisken (för enkelhetens skull kan man använda filen från uppgift 7)");
            Console.WriteLine("9) Funktion där användaren skickar in ett decimaltal och får tillbakaroten ur, upphöjt till 2 och upphöjt till 10");
            Console.WriteLine("10) Funktion där programmet skriver ut en multiplikationstabell från 1 till 10. En ”tabb”ska läggas in efter varje nummer. Försöka att ställa upp det så det blir relativt läsbart.");
            Console.WriteLine("11) Funktion som skapar två arrayer. Den första fylls med slumpmässiga tal. Den andra fylls med talen från den första i stigande ordning.Array.Sort() får EJ användas.");
            Console.WriteLine("12) Funktion som tar en input från användaren och kontrollerar ifall det är en palindrom (alltså samma ord från båda håll, såsom Anna eller radar.");
            Console.WriteLine("13) Funktion som tar två inputs från användaren och skriver sedan ut alla siffror som är mellan de två inputsen.");
            Console.WriteLine("14) Funktion där användaren skickar in ett antal värden (komma-separerade siffror) som sedan sorteras och skrivs ut efter udda och jämna värden.");
            Console.WriteLine("15) Funktion där användaren skriver in ett antal värden(komma-separerade siffor) som sedan adderas och skrivs ut.");
            Console.WriteLine("16) Funktion där användaren ska ange namnet på sin karaktär och namnet på en motståndare. Funktionen skall sedan själv lägga till slumpmässiga värden för Hälsa, Styrka och Tur, som sparas i en instans av en klass.");
            Console.WriteLine("0) Exit");
            Console.Write("\r\nVad vill du göra? ");

            switch (Console.ReadLine())
            {
                case "1":
                    HelloWorld();
                    return true;
                case "2":
                    FirstLastAge();
                    return true;
                case "3":
                    ColorChanger();
                    return true;
                case "4":
                    DagensDatum();
                    return true;
                case "5":
                    VadArStorst();
                    return true;
                case "6":
                    GissaNummer();
                    return true;
                case "7":
                    SkrivTillFil();
                    return true;
                case "8":
                    LasFranFil();
                    return true;
                case "9":
                    MatteMatik();
                    return true;
                case "10":
                    MatteMatik2();
                    return true;
                case "11":
                    RandomSortering();
                    return true;
                case "12":
                    Palindrom();
                    return true;
                case "13":
                    MellanTvaTal();
                    return true;
                case "14":
                    SorteraUddaJamn();
                    return true;
                case "15":
                    AdderaAllaNummer();
                    return true;
                case "16":
                    SpelareOchMotstandare();
                    return true;
                case "0":
                    return false;
                default:
                    return true;
            }
        }
    }
}