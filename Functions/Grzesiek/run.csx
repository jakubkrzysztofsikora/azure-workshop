#r "Newtonsoft.Json"

using System;
using System.Text;
using System.Net.Http;
using Newtonsoft.Json;

public static async Task<string> Run(string[] tweets, ILogger log)
{
    string apiUrl = "https://northeurope.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment";
    Dictionary<string,dynamic> tweetsWithIds = tweets
        .Select(tweet => JsonConvert.DeserializeObject<dynamic>(tweet))
        .ToDictionary(x => x.TweetId.ToString() as string, x => x);
    log.LogInformation($"Tweets in one batch: {tweetsWithIds.Count}");
    List<object> output = new List<object>();
    
    var payload = new Dictionary<string, object>
    {
        ["documents"] = tweetsWithIds.Select(x => new Dictionary<string, object>
        {
            ["id"] = x.Key,
            ["text"] = x.Value.Tweet
        })
    };

    using(HttpClient client = new HttpClient())
    {
        client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "e55fb7fc62264a21ba4932286c77b658");
        var requestData = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
        var response = await client.PostAsync(apiUrl, requestData);
        var sentimentResult = await response.Content.ReadAsStringAsync();
        var sentiments = JsonConvert.DeserializeObject<Dictionary<string, List<dynamic>>>(sentimentResult)["documents"]
            .Select(x =>
            {
                return new { TweetId = x["id"], SeriesId = tweetsWithIds[x["id"].ToString()].SeriesId, Score = x["score"] };
            });
        log.LogInformation(JsonConvert.SerializeObject(payload));
        log.LogInformation(JsonConvert.SerializeObject(sentiments));

        return JsonConvert.SerializeObject(sentiments);
    }
}
