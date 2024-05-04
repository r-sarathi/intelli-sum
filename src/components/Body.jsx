import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link2, Loader, SendHorizontal, Copy, Check } from "lucide-react";
import { useLazyGetSummaryQuery } from "@/services/article";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Body = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");
  const [articleCopied, setArticleCopied] = useState(false);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    const { data } = await getSummary({ articleUrl: article.url });
    console.log("Data: ", data);
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
    console.log("Submitted Article URL: ", article.url);
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleArticleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setArticleCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="flex justify-center">
      <section className="mt-7 w-full max-w-screen-lg">
        <div className="flex flex-col w-full gap-2">
          <form className="relative flex items-center" onSubmit={handleSubmit}>
            <Link2 className="absolute left-0 my-6 ml-3 h-4 w-4" />
            <Input
              type="url"
              placeholder="Paste the article link..."
              className="h-14 pl-10 pr-12"
              required
              value={article.url}
              onChange={(e) => {
                setArticle({ ...article, url: e.target.value });
              }}
            />
            <Button type="submit" className="absolute right-2">
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </form>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium mt-2">
                Previous Links
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                  {allArticles.reverse().map((item, index) => (
                    <div
                      key={`link-${index}`}
                      onClick={() => setArticle(item)}
                      className="flex flex-row justify-between border rounded-md items-center h-14 pl-3 pr-2"
                    >
                      <div className="flex flex-row items-center gap-2">
                        <Link2 className="h-4 w-4" />
                        <p className="flex-1 text-sm truncate">{item.url}</p>
                      </div>
                      <div
                        className="copy_btn"
                        onClick={() => handleCopy(item.url)}
                      >
                        <Button>
                          {copied === item.url ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="my-10 max-w-full flex justify-center items-center">
          {isFetching ? (
            <Loader className="animate-spin" />
          ) : error ? (
            <p className="font-inter font-boldtext-center">
              Well, that wasn&apos;t supposed to happen...
              <br />
              <span className="font-normal text-red-600">
                {error?.data?.error}
              </span>
            </p>
          ) : (
            article.summary && (
              <div className="flex flex-col gap-3">
                <h2 className="font-bold text-2xl">Article Summary</h2>
                <p className="indent-8 text-justify">{article.summary}</p>
                <Button
                  onClick={() => handleArticleCopy(article.summary)}
                  className="h-10"
                >
                  {articleCopied ? <p>Copied</p> : <p>Copy</p>}
                </Button>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Body;
