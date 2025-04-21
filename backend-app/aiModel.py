from llama_cpp import Llama
import os

MODEL_PATH = os.path.join(os.getcwd(), "models", "blake.gguf")

class LocalLLM:
    def __init__(self):
        try:
            self.llm = Llama(
                model_path=MODEL_PATH,
                n_ctx=2048,
                n_threads=8,
                n_gpu_layers=25,
                chat_format="llama-2"
            )
            print("✅ LLM model loaded successfully.")
        except Exception as e:
            print(f"❌ Failed to load LLM model: {str(e)}")
            self.llm = None

    def generate_post(self, prompt: str) -> str:
        if not self.llm:
            return "LLM model is not available."

        try:
            print(f"🧠 Prompt received by LLM: {prompt}")
            response = self.llm.create_chat_completion(
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=200
            )
            if "choices" in response and response["choices"]:
                content = response["choices"][0]["message"]["content"].strip()
                print(f"✅ Generated content: {content}")
                return content
            print("⚠️ No choices returned from model.")
            return "No content generated."
        except Exception as e:
            print(f"❌ Error generating response: {str(e)}")
            return "Error generating content."
