#r "Microsoft.Azure.Documents.Client"
#r "Newtonsoft.Json"
using System;
using System.Collections.Generic;
using System.Text;
using System.Net.Http;
using Microsoft.Azure.Documents;
using Newtonsoft.Json;

public static async Task<object[]> Run(IReadOnlyList<Document> documents, TraceWriter log)
{
    string apiUrl = "https://northeurope.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment";
    List<object> output = new List<object>();

    if (documents != null && documents.Count > 0)
    {
        foreach(var document in documents)
        {
            var tweet = document.GetPropertyValue<dynamic>("tweet");
            var values = new Dictionary<string, object>
            {
                { "documents", new List<Dictionary<string, dynamic>>{
                    new Dictionary<string, dynamic>{
                        { "id", document.Id },
                        { "text", tweet["TweetText"] }
                } } 
                }
            };
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "c7999046fd574e87b8b59ad115922ad0");
            var requestData = new StringContent(JsonConvert.SerializeObject(values), Encoding.UTF8, "application/json");
            var response = await client.PostAsync(apiUrl, requestData);
            var sentimentResult = await response.Content.ReadAsStringAsync();
            var sentiment = JsonConvert.DeserializeObject<dynamic>(sentimentResult);
            sentiment.seriesId = document.GetPropertyValue<string>("seriesId");
            sentiment.id = tweet["TweetId"];
            output.Add(sentiment);
        }
    }

    return output.ToArray();
}
