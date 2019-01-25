#r "Newtonsoft.Json"
#r "System.Data"

using System;
using System.Data.SqlClient;
using System.Configuration;
using Newtonsoft.Json;

public static async Task Run(string sentiments, ILogger log)
{
    foreach(var sentiment in JsonConvert.DeserializeObject<dynamic>(sentiments))
    {
        using (SqlConnection conn = new SqlConnection(Environment.GetEnvironmentVariable("WorkshopPoc")))
        {
            var seriesId = Convert.ToInt32(sentiment["SeriesId"]);
            var rating = sentiment["Score"];
            conn.Open();
            var command = $"UPDATE [dbo].[Series] SET [VotesCount] = [VotesCount] + 1, Rating = (([Rating] * ([VotesCount])) + {rating}) / ([VotesCount] + 1) WHERE [dbo].[Series].[Id] = {seriesId}";

            log.LogInformation($"{command}");
            using (SqlCommand cmd = new SqlCommand(command, conn))
            {
                var rows = await cmd.ExecuteNonQueryAsync();
                log.LogInformation($"{rows} rows were updated");
            }
            conn.Close();
        }
    }
}
