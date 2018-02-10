#r "Microsoft.Azure.Documents.Client"
using System;
using System.Collections.Generic;
using Microsoft.Azure.Documents;

public static void Run(IReadOnlyList<Document> documents, TraceWriter log)
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
                var rating = document.GetPropertyValue<dynamic>("documents")["score"];

                var text = "UPDATE [dbo].[Series] " + 
                        "SET [VotesCount] = [VotesCount] + 1, Rating = ";

                using (SqlCommand cmd = new SqlCommand(text, conn))
                {
                    // Execute the command and log the # rows affected.
                    var rows = await cmd.ExecuteNonQueryAsync();
                    log.Info($"{rows} rows were updated");
                }
            }
        }
    }
}
