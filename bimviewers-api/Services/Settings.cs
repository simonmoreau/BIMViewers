
namespace bimviewers_api.Services
{
    public class AppSettings
    {
        public string Setting1 { get; set; }
        public ForgeSettings Forge { get; set; }
    }

    public class ForgeSettings
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string InputBucketKey { get; set; }
        public string OutputBucketKey { get; set; }
    }
}
