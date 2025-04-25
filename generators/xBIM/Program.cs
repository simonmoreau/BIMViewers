using System.IO;
using Xbim.Ifc;
using Xbim.ModelGeometry.Scene;

namespace CreateWexBIM
{
    class Program
    {
        public static void Main()
        {
            string fileName = @"C:\Users\smoreau\Downloads\Snowdon Towers Sample Structural.ifc";

            var timer = new System.Diagnostics.Stopwatch();
            timer.Start();
            using (var model = IfcStore.Open(fileName))
            {
                var context = new Xbim3DModelContext(model);
                context.CreateContext();

                var wexBimFilename = Path.ChangeExtension(fileName, "wexBIM");
                using (var wexBiMfile = File.Create(wexBimFilename))
                {
                    using (var wexBimBinaryWriter = new BinaryWriter(wexBiMfile))
                    {
                        model.SaveAsWexBim(wexBimBinaryWriter);
                        wexBimBinaryWriter.Close();
                    }
                    wexBiMfile.Close();
                }
            }

            timer.Stop();
            System.Console.WriteLine($"Elapsed time: {timer.ElapsedMilliseconds} ms");
        }
    }
}
