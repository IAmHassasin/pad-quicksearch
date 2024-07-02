# DEV Logs
Since i do not have blog or sth similar, i'll share some details about why i make this repo/site, why i choose this flow to maintaint site, and how i do it.
# Why i make this repo
Well, basically, all thirth-party app/site support "the game" was gone, reason, i guess, is violated DCMA. Since Index was killed, players, in NA, found quite hardly to build a team, find a right monster or just get news of "the game". 

Discord Team and their crews was doing a very, very, very good jobs. But sadly, Discord Bot dont provide UI, either options to search by list awk. 
That's when i think i should do something, at least to support myself and my local community. 
# Why i choose this flow to maintaint site
There're a few conditon i want show first:

* I can't spend my own money for this
* Need to be simple, so if i can't do this forever, someone might take over
* Need to be fast. I hate site's slow response, as well as others, i guess

So, with condition not using my own money. There're 2 ways to deal with BE/DB side. Use a free service, or just use a json file as DB. An i choose method 2, cause it need to be simple and fast. Free will never be fast :)

With FE, easiest way is using Github Pages. I'm also think it's good enough, and gh-pages lib also support react app, what a great.

Now, with condition fast. There're a prob with DB from "Discord Team and their crews" i realise is their DB is quite big and there're plenty of datas my site won't need. I need a tool, yes, i did it. Also their DB need to be converted into JSON file. 

# How i do it
I build a tool from what ChatGPT helped me from draft. It's existed out there, but i won't share it public 🤣

Then i move to FE process. I use create-react-app as base and it worked quite well. ChatGPT also support me a lots with this process. Thank you 🤣

I'm also did a quick survey and take comments from my local community on what they need. They did helped me a lots. 
