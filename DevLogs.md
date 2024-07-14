# DEV Logs
Since i do not have blog or sth similar, i'll share some details about why i make this repo/site, why i choose this flow to maintaint site, and how i do it.
# Why i make this repo
Well, basically, all thirth-party app/site support "the game" was gone, reason, i guess, is violated DCMA. Since Index was killed, players, in NA, it's quite hardly to build a team, find a right monster or just get news of "the game". 

Discord Team and their crews was doing a very, very, very good jobs. But sadly, Discord Bot does not provide UI, either options to search by list awk. 
That's when i think i should do something, at least to support myself and my local community. 
# Why i choose this flow to maintaint site
There're a few conditon i want show first:

* I can't spend my own money for this
* Need to be simple, so if i can't do this forever, someone might take over
* Need to be fast. I hate site's slow response, as well as others, i guess

So, with condition not using my own money. There're 2 ways to deal with BE/DB side. Use a free service, or just use a json file as DB. And i choose method 2, cause it need to be simple and fast. Free will never be fast :)

With FE, easiest way is using Github Pages. I'm also think it's good enough, and gh-pages lib also support react app, what a great.

Now, with condition fast. There're a prob with DB from "Discord Team and their crews" i realize is their DB is quite big and there're plenty of datas my site won't need. I need a tool, yes, i did it. Also their DB need to be converted into JSON file. 

# How i do it
I build a tool to export DB into JSON file, from what ChatGPT helped me from draft. It's existed out there, but i won't share it public 🤣

Then i move to FE process. I use create-react-app as base and it worked quite well. ChatGPT also support me a lots with this process. Thank you 🤣

I'm also did a quick survey and take comments from my local community on what they need. They did helped me a lots. 

That's what the base on this site was built. 

Today is 7/7/2024, i spent last week try to make my own assets. Certainly, i can't complete all (i'm not using all my times to do it, i need do my job to feed my own). At this moment, i'm made 33 icons. And there're around double of that amount need to be made. 

So i used "existed" resources. Also set a password to limit who can access my site. Idk at the moment you read this note, is it public for everyone? I hope so 🤣

I done quite a lots work today, i added "icons", did a little refactor and tried to use authen func of Auth0, but i figured out that just using hashed password will be enough 🤣

Currently, site is quite done. It need improve search function. I'm still try to find most optimize way for this. 

Hi, today is 14/7, so a week from last note, i'm quite busy with my work, cause i just moved into a new project, it's quite fun. Now is 00:07 AM. Site was updated with awk filter function. Also i group awks into something might be quicker to find. Also do a little trick with display in order and learnt few new things.

My next target will be Collab Filter, which i believed will not take long, after i finish few runs in UN6, such a good drops LOL

Well, today is 14/7, around 6PM. I finish filter by collab, there're some changes in DB structure, which made SQL quite hard to handle, so i move that step into FE, make prog a little slower when load, but i think that's okay, at least till in figure out a way to handle in SQL side LOL
