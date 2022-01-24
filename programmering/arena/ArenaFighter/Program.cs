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
        public int luck; //Tur!

        public Character(string namn, int health, int strength)
        {
            this.namn = namn;
            this.health = health;
            this.strength = strength;
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

        static void CharacterCreation()
        {

        }

        static void BattleMode()
        {

        }

        static void Main()
        {
            if (!File.Exists("spelare.xml"))
            {
                // Spara objektet
                Random rand = new Random();
                int sHealth = rand.Next(1, 101); //Hälsa, mellan 1 och 100.
                int sStrength = rand.Next(1, 11); //Styrka, mellan 1 och 10.
                Console.WriteLine("Vad heter din spelare?");
                Character spelare = new Character(Console.ReadLine(), sHealth, sStrength); //Skapa Spelaren
                SaveViaDataContractSerialization(spelare, "spelare.xml");   //Spara Spelaren
                spelare = null; //Spelaren "tas bort"
                spelare = LoadViaDataContractSerialization<Character>("spelare.xml"); //Ladda in spelare.
                Console.WriteLine(spelare.ToString()); //Visa spelaren
            }
            else
            {
                Character spelare = LoadViaDataContractSerialization<Character>("spelare.xml"); //Ladda in spelare.
                Console.WriteLine(spelare.ToString()); //Visa spelaren
            }
        }
    }
}