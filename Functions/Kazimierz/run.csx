#r "Microsoft.Azure.Documents.Client"
#r "System.Configuration"
#r "System.Data"
using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.Azure.Documents;

public static async Task Run(IReadOnlyList<Document> documents, TraceWriter log)
{
    if (documents != null && documents.Count > 0)
    {
        foreach(var document in documents)
        {
            var conectionString = ConfigurationManager.ConnectionStrings["WorkshopPoc"].ConnectionString;
            using (SqlConnection conn = new SqlConnection(conectionString))
            {
                conn.Open();
                var seriesId = document.GetPropertyValue<string>("seriesId");
                var rating = document.GetPropertyValue<dynamic>("documents")[0]["score"];

                var text = $"UPDATE [dbo].[Series] SET [VotesCount] = [VotesCount] + 1, Rating = (([Rating] * ([VotesCount])) + {rating}) / ([VotesCount] + 1)";

                using (SqlCommand cmd = new SqlCommand(text, conn))
                {
                    var rows = await cmd.ExecuteNonQueryAsync();
                    log.Info($"{rows} rows were updated");
                }
            }
        }
    }
}
