using System.Collections.Generic;
using Microsoft.Azure.Documents;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using System.Configuration;
using Dapper;
using System.Data.SqlClient;

namespace Functions.Kazimierz
{
    public static class Kazimierz
    {
        [FunctionName("Kazimierz")]
        public static void Run(
            [CosmosDBTrigger("series", "Sentiments", ConnectionStringSetting = "grzesiek_DOCUMENTDB")]
    IReadOnlyList<Document> documents,

            TraceWriter log)
        {
            if (documents != null && documents.Count > 0)
            {
                foreach (var document in documents)
                {
                    var conectionString = ConfigurationManager.ConnectionStrings["WorkshopPoc"].ConnectionString;
                    var seriesId = document.GetPropertyValue<string>("seriesId");
                    var rating = document.GetPropertyValue<dynamic>("documents")["score"];

                    var text = "UPDATE [dbo].[Series] " +
                            "SET [VotesCount] = [VotesCount] + 1, Rating = ";

                    using (SqlConnection conn = new SqlConnection(conectionString))
                    {

                    conn.Open();
                    conn.Execute("update [dbo].[Series] set [VotesCount] = [VotesCount] + 1, [Rating] = ([Rating]*[VotesCount]+ @score)/([VotesCount]+1) where seriesId = @seriesId");
                    }
                }
            }
        } 
                    
    }
}
