const GPT_RESPONSE={
  "warning": "This model version is deprecated. Migrate before January 4, 2024 to avoid disruption of service. Learn more https://platform.openai.com/docs/deprecations",
  "id": "cmpl-807PSQ6pQMCzjJ09ST8y5WqTXRznQ",
  "object": "text_completion",
  "created": 1695039174,
  "model": "text-davinci-002",
  "choices": [
    {
      "text": "\n\nHappy birthday, Sumith! Wishing you all the best on your special day. May all your dreams and aspirations come true. Enjoy every moment!",
      "index": 0,
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 7,
    "completion_tokens": 32,
    "total_tokens": 39
  }
}
const jsonString=JSON.stringify(GPT_RESPONSE);
const response = new Response(jsonString, {
      headers: {
        'Content-Type': 'application/json'
      }
    });