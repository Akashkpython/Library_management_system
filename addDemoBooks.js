const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('./models/Item');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Demo free books data
const demoBooks = [
  {
    title: "The Adventures of Tom Sawyer",
    author: "Mark Twain",
    category: "Adventure",
    description: "The Adventures of Tom Sawyer is a novel by Mark Twain, published in 1876. It is a story about a young boy growing up along the Mississippi River.",
    price: 0,
    currency: "INR",
    isFree: true,
    quantity: 100,
    available: true,
    language: "English",
    content: `The Adventures of Tom Sawyer

Chapter 1: Y-o-u-u Tom-Aunt Polly

"TOM!"

No answer.

"TOM!"

Still no answer.

"What's gone with that boy, I wonder? You TOM!"

The old lady pulled her spectacles down and looked over them about the room; then she put them up and looked out under them. She seldom or never looked through them for so small a thing as a boy; they were her state pair, the pride of her heart, and were built for "style," not service—she could have seen through a pair of stove-lids just as well.

Ain't you afraid of anything?"

"Well, I'm kind of afraid of dead people."

"Why?"

"Because they're so quiet."

"Well, that's something. I ain't afraid of dead people. I've been around them a good deal, and they don't bother me. It's living people that's so disagreeable. There ain't anything the matter with a ghost that a body can't manage. It's the folks that are alive that you've got to look out for."

"Well, that's so. A body can't be too careful. But somehow I haven't as much confidence in dead people as I used to have. There's a heap of difference between a ghost that's been dead a long time and one that's fresh killed. The fresh ones are restless, and they're dangerous. But you be careful of the old ones, and they'll be careful of you."

"All right, I'll be careful. But I wish I could see a ghost."

"Well, you'll see plenty of them before you're through with this business, I reckon. They come pretty thick, sometimes."

"I hope they do. I want to get some of their names down."

"Oh, you do, do you?"

"Yes, and I want to ask them all sorts of questions."

"Well, if you ain't the beatenes' boy I ever see! You're just as anxious to git into trouble with ghosts as other boys is to git out of it."

"Well, I ain't afraid of them."

"You will be, one of these days, and then you'll wish you was."

"I won't either."

"You will."

"I won't."

"You will."

"I won't."

"You will."

"Oh, you make me tired! You're just as contrary as you can be. I don't know what to do with you. You're enough to drive a body crazy. You're the most aggravating boy that ever lived. You're just as contrary as a mule. I believe you do it a-purpose."

"I don't either."

"You do."

"I don't."

"You do."

"I don't."

"You do."

"Well, I shan't stop."

"You'll see if you don't. I'm going to spank you."

"Well, I shan't mind it."

"You won't, won't you?"

"No, I won't."

"Oh, you make me so tired! I believe I'll just sit down and cry."

"Well, go ahead. I don't care."

"Oh, you're too many for me. You're just as aggravating as you can be. I don't know what to do with you. You're enough to drive a body crazy. You're the most aggravating boy that ever lived. You're just as contrary as a mule. I believe you do it a-purpose."

This dialogue continued, with Aunt Polly trying to catch Tom and Tom dodging her, until both were out of breath and Tom escaped over the fence.`,
    tags: ["classic", "adventure", "children"]
  },
  {
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    category: "Fantasy",
    description: "Alice's Adventures in Wonderland is an 1865 novel written by English author Charles Lutwidge Dodgson under the pseudonym Lewis Carroll.",
    price: 0,
    currency: "INR",
    isFree: true,
    quantity: 100,
    available: true,
    language: "English",
    content: `Alice's Adventures in Wonderland

Chapter 1: Down the Rabbit-Hole

Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, "and what is the use of a book," thought Alice "without pictures or conversations?"

So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.

There was nothing so very remarkable in that; nor did Alice think it so very much out of the way to hear the Rabbit say to itself, "Oh dear! Oh dear! I shall be late!" (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural); but when the Rabbit actually took a watch out of its waistcoat-pocket, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.

In another moment down went Alice after it, never once considering how in the world she was to get out again.

The rabbit-hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that Alice had not a moment to think about stopping herself before she found herself falling down a very deep well.

Either the well was very deep, or she fell very slowly, for she had plenty of time as she went down to look about her and to wonder what was going to happen next. First, she tried to look down and make out what she was coming to, but it was too dark to see anything; then she looked at the sides of the well, and noticed that they were filled with cupboards and book-shelves; here and there she saw maps and pictures hung upon pegs. She took down a jar from one of the shelves as she passed; it was labelled "ORANGE MARMALADE", but to her great disappointment it was empty: she did not like to drop the jar for fear of killing somebody underneath, so managed to put it into one of the cupboards as she fell past it.

"Well!" thought Alice to herself, "after such a fall as this, I shall think nothing of tumbling down stairs! How brave they'll all think me at home! Why, I wouldn't say anything about it, even if I fell off the top of the house!" (Which was very likely true.)

Down, down, down. Would the fall never come to an end? "I wonder how many miles I've fallen by this time?" she said aloud. "I must be getting somewhere near the centre of the earth. Let me see: that would be four thousand miles down, I think—" (for, you see, Alice had learnt several things of this sort in her lessons in the schoolroom, and though this was not a very good opportunity for showing off her knowledge, as there was no one to listen to her, still it was good practice to say it over) "—yes, that's about the right distance—but then I wonder what Latitude or Longitude I've got to?" (Alice had no idea what Latitude was, or Longitude either, but thought they were nice grand words to say.)

Presently she began again. "I wonder if I shall fall right through the earth! How funny it'll seem to come out among the people that walk with their heads downward! The Antipathies, I think—" (she was rather glad there was no one listening, this time, as it didn't sound at all the right word) "—but I shall have to ask them what the name of the country is, you know. Please, Ma'am, is this New Zealand or Australia?" (and she tried to curtsey as she spoke—fancy curtseying as you're falling through the air! Do you think you could manage it?) "And what an ignorant little girl she'll think me for asking! No, it'll never do to ask: perhaps I shall see it written up somewhere."

Down, down, down. There was nothing else to do, so Alice soon began talking again. "Dinah'll miss me very much to-night, I should think!" (Dinah was the cat.) "I hope they'll remember her saucer of milk at tea-time. Dinah my dear! I wish you were down here with me! There are no mice in the air, I'm afraid, but you might catch a bat, and that's very like a mouse, you know. But do cats eat bats, I wonder?" And here Alice began to get rather sleepy, and went on saying to herself, in a dreamy sort of way, "Do cats eat bats? Do cats eat bats?" and sometimes, "Do bats eat cats?" for, you see, as she couldn't answer either question, it didn't much matter which way she put it. She felt that she was dozing off, and had just begun to dream that she was walking hand in hand with Dinah, and saying to her very earnestly, "Now, Dinah, tell me the truth: did you ever eat a bat?" when suddenly, thump! thump! down she came upon a heap of sticks and dry leaves, and the fall was over.

Alice was not a bit hurt, and she jumped up on to her feet in a moment: she looked up, but it was all dark overhead; before her was another long passage, and the White Rabbit was still in sight, hurrying down it. There was not a moment to be lost: away went Alice like the wind, and was just in time to hear it say, as it turned a corner, "Oh my ears and whiskers, how late it's getting!" She was close behind it when she turned the corner, but the Rabbit was no longer to be seen: she found herself in a long, low hall, which was lit up by a row of lamps hanging from the roof.

There were doors all round the hall, but they were all locked; and when Alice had been all the way down one side and up the other, trying every door, she walked sadly down the middle, wondering how she was ever to get out again.

Suddenly she came upon a little three-legged table, all made of solid glass; there was nothing on it except a tiny golden key, and Alice's first thought was that it might belong to one of the doors of the hall; but, alas! either the locks were too large, or the key was too small, but at any rate it would not open any of them. However, on the second time round, she came upon a low curtain she had not noticed before, and behind it was a little door about fifteen inches high: she tried the little golden key in the lock, and to her great delight it fitted!

Alice opened the door and found that it led into a small passage, not much larger than a rat-hole: she knelt down and looked along the passage into the loveliest garden you ever saw. How she longed to get out of that dark hall, and wander about among those beds of bright flowers and those cool fountains, but she could not even get her head through the doorway; "and even if my head would go through," thought poor Alice, "it would be of very little use without my shoulders. Oh, how I wish I could shut up like a telescope! I think I could, if I only knew how to begin." For, you see, so many out-of-the-way things had happened lately, that Alice had begun to think that very few things indeed were really impossible.

There seemed to be no use in waiting by the little door, so she went back to the table, half hoping she might find another key on it, or at any rate a book of rules for shutting people up like telescopes: this time she found a little bottle on it, ("which certainly was not here before," said Alice,) and round the neck of the bottle was a paper label, with the words "DRINK ME," beautifully printed on it in large letters.

It was all very well to say "Drink me," but the wise little Alice was not going to do that in a hurry. "No, I'll look first," she said, "and see whether it's marked 'poison' or not"; for she had read several nice little histories about children who had got burnt, and eaten up by wild beasts and other unpleasant things, all because they would not remember the simple rules their friends had taught them: such as, that a red-hot poker will burn you if you hold it too long; and that if you cut your finger very deeply with a knife, it usually bleeds; and she had never forgotten that, if you drink much from a bottle marked "poison," it is almost certain to disagree with you, sooner or later.

However, this bottle was not marked "poison," so Alice ventured to taste it, and finding it very nice, (it had, in fact, a sort of mixed flavour of cherry-tart, custard, pine-apple, roast turkey, toffee, and hot buttered toast,) she very soon finished it off.

"What a curious feeling!" said Alice; "I must be shutting up like a telescope."

And so it was indeed: she was now only ten inches high, and her face brightened up at the thought that she was now the right size for going through the little door into that lovely garden. First, however, she waited for a few minutes to see if she was going to shrink any further: she felt a little nervous about this; "for it might end, you know," said Alice to herself, "in my going out altogether, like a candle. I wonder what I should be like then?" And she tried to fancy what the flame of a candle is like after the candle is blown out, for she could not remember ever having seen such a thing.

After a while, finding that nothing more happened, she decided on going into the garden at once; but, alas for poor Alice! when she got to the door, she found she had forgotten the little golden key, and when she went back to the table for it, she found she could not possibly reach it: she could see it quite plainly through the glass, and she tried her best to climb up one of the legs of the table, but it was too slippery; and when she had tired herself out with trying, the poor little thing sat down and cried.

"Come, there's no use in crying like that!" said Alice to herself, rather sharply; "I advise you to leave off this minute!" She generally gave herself very good advice, (though she very seldom followed it), and sometimes she scolded herself so severely as to bring tears into her eyes; and once she remembered trying to box her own ears for having cheated herself in a game of croquet she was playing against herself, for this curious child was very fond of pretending to be two people. "But it's no use now," thought poor Alice, "to pretend to be two people! Why, there's hardly enough of me left to make one respectable person!"

Soon her eye fell on a little glass box that was lying under the table: she opened it, and found in it a very small cake, on which the words "EAT ME" were beautifully marked in currants. "Well, I'll eat it," said Alice, "and if it makes me grow larger, I can reach the key; and if it makes me grow smaller, I can creep under the door; so either way I'll get into the garden, and I don't care which happens!"

She ate a little bit, and said anxiously to herself, "Which way? Which way?", holding her hand on the top of her head to feel which way it was growing, and she was quite surprised to find that she remained the same size: to be sure, this generally happens when one eats cake, but Alice had got so much into the way of expecting nothing but out-of-the-way things to happen, that it seemed quite dull and stupid for life to go on in the common way.

So she set to work, and very soon finished off the cake.`,
    tags: ["classic", "fantasy", "children"]
  },
  {
    title: "The Jungle Book",
    author: "Rudyard Kipling",
    category: "Adventure",
    description: "The Jungle Book is a collection of stories by the English author Rudyard Kipling. The stories are fables, using animals in an anthropomorphic manner to give moral lessons.",
    price: 0,
    currency: "INR",
    isFree: true,
    quantity: 100,
    available: true,
    language: "English",
    content: `The Jungle Book

Mowgli's Brothers

Now Rann the Kite brings home the night
   That Mang the Bat sets free--
The herds are shut in byre and hut
   For loosed till dawn are we.
This is the hour of pride and power,
   Talon and tush and claw.
Oh, hear the call!--Good hunting all
   That keep the Jungle Law!
Night-Song in the Jungle

It was seven o'clock of a very warm evening in the Seeonee hills when Father Wolf woke up from his day's rest, rubbed his eyes, yawned, and spread his paws one after the other to get rid of the sleepy feeling in their tips. Mother Wolf lay with her big gray nose dropped across her four tumbling, squealing cubs, and the moon shone into the mouth of the cave where they all lived. "Augrh!" said Father Wolf. "It is time to hunt again." He was going to spring down hill when a little shadow with a bushy tail crossed the threshold and whined: "Good luck go with you, O Chief of the Wolves. And good luck and strong white teeth go with noble children that they may never forget the hungry in this world."

It was the jackal--Tabaqui, the Dish-licker--and the wolves of India despise Tabaqui because he runs about making mischief, and telling tales, and eating rags and pieces of leather from the village rubbish-heaps. But they are afraid of him too, because Tabaqui, more than anyone else in the jungle, is apt to go mad, and then he forgets that he was ever afraid of anyone, and runs through the forest biting everything in his way. Even the tiger runs and hides when little Tabaqui goes mad, for madness is the most disgraceful thing that can overtake a wild creature. We call it hydrophobia, but they call it dewanee--the madness--and run.

"Enter, then, and look," said Father Wolf stiffly, "but there is no food here."

"For a wolf, no," said Tabaqui, "but for so mean a person as myself a dry bone is a good feast. Who are we, the Gidur-log [the jackal people], to pick and choose?" He scuttled to the back of the cave, where he found the bone of a buck with some meat on it, and sat cracking the end merrily.

"All thanks for this good meal," he said, licking his lips. "How beautiful are the noble children! How large are their eyes! And so young too! Indeed, indeed, I might have remembered that the children of kings are men from the beginning."

Now, Tabaqui knew as well as anyone else that there is nothing so unlucky in the jungle as to compliment children to their faces. It pleased him to see Mother and Father Wolf look uncomfortable.

Tabaqui sat still, rejoicing in the mischief that he had made, and then he said spitefully:

"Shere Khan, the Big One, has changed his hunting-grounds. He will hunt among these hills for the next moon, so he has told me."

Shere Khan was the tiger who lived near the Waingunga River, twenty miles away.

"He has no right!" Father Wolf began angrily--"By the Law of the Jungle he has no right to change his quarters without due warning. He will frighten every head of game within ten miles, and I--I have to kill for two, these days."

"His mother did not call him Lungri [the Lame One] for nothing," said Tabaqui, looking up mockingly. "He has been lame in one foot from his birth. That is why he has only changed his quarters now, and not before. He meant to kill Man-cub here, and he has not done so. He will make more mischief. I have told you. He will make more mischief. The red dogs are not a good breed. They did not know they were living in a wolf-pack till I came among them. They will make more mischief."

The red dogs are the wild dholes--the Indian wild dog--and Father Wolf's temper grew worse as Tabaqui talked.

"Man-cub?" said he. "What talk is this of Man-cub? May I not kill my own meat without asking leave of the Cattle Thief? He is no kin of mine, and he is no whelp of thine, thou Dot-tailed Little One!"

"I have said that I heard Shere Khan speak of the matter," said Tabaqui. "May I not tell a tale that I have heard? Shere Khan, moreover, is now in the jungle. I saw him there."

"Indeed?" said Father Wolf. "I am glad to hear it. I was beginning to be afraid that he might have gone to the Deccan to lie up for the winter."

"He has come back to kill Man-cub. He says that he is a man's child and a man's cub must be killed. He says also that he has eaten no man as yet, but he will make Shikanji [the Evening Hunt] his first meal. He says that he is very full of advice for the pack. He says--"

"Ha! ha! ha!" said Father Wolf, no wise believing what Tabaqui said, but glad to know that Shere Khan would be at so great a distance in the morning. "He says that he is a man's child and a man's cub must be killed. He says also that he has eaten no man as yet, but he will make Shikanji his first meal. He says that he is very full of advice for the pack. He says--"

"Shere Khan, the Big One, has changed his hunting-grounds. He will hunt among these hills for the next moon, so he has told me."

Shere Khan was the tiger who lived near the Waingunga River, twenty miles away.

"He has no right!" Father Wolf began angrily--"By the Law of the Jungle he has no right to change his quarters without due warning. He will frighten every head of game within ten miles, and I--I have to kill for two, these days."

"His mother did not call him Lungri [the Lame One] for nothing," said Tabaqui, looking up mockingly. "He has been lame in one foot from his birth. That is why he has only changed his quarters now, and not before. He meant to kill Man-cub here, and he has not done so. He will make more mischief. I have told you. He will make more mischief. The red dogs are not a good breed. They did not know they were living in a wolf-pack till I came among them. They will make more mischief."

The red dogs are the wild dholes--the Indian wild dog--and Father Wolf's temper grew worse as Tabaqui talked.

"Man-cub?" said he. "What talk is this of Man-cub? May I not kill my own meat without asking leave of the Cattle Thief? He is no kin of mine, and he is no whelp of thine, thou Dot-tailed Little One!"

"I have said that I heard Shere Khan speak of the matter," said Tabaqui. "May I not tell a tale that I have heard? Shere Khan, moreover, is now in the jungle. I saw him there."

"Indeed?" said Father Wolf. "I am glad to hear it. I was beginning to be afraid that he might have gone to the Deccan to lie up for the winter."

"He has come back to kill Man-cub. He says that he is a man's child and a man's cub must be killed. He says also that he has eaten no man as yet, but he will make Shikanji [the Evening Hunt] his first meal. He says that he is very full of advice for the pack. He says--"

"Ha! ha! ha!" said Father Wolf, no wise believing what Tabaqui said, but glad to know that Shere Khan would be at so great a distance in the morning. "He says that he is a man's child and a man's cub must be killed. He says also that he has eaten no man as yet, but he will make Shikanji his first meal. He says that he is very full of advice for the pack. He says--"

"He says that he will make the red dogs do what he would have done himself, and kill Man-cub. He says that he has eaten no man as yet, but he will make Shikanji his first meal. He says that he is very full of advice for the pack. He says--"

"Ha! ha! ha!" said Father Wolf. "He says that he will make the red dogs do what he would have done himself, and kill Man-cub. He says that he has eaten no man as yet, but he will make Shikanji his first meal. He says that he is very full of advice for the pack. He says--"

Father Wolf stopped short in his speech. He was not going to waste time arguing with Tabaqui. He looked at Mother Wolf and saw that she was ready for the leap. So he bent his head to the earth and came to the spring, and Mother Wolf and the cubs went up the hillside like a flash of green light, and they came to the mouth of the cave where Shere Khan sat, and they stopped.

"Now," said Father Wolf, "we have him."

Shere Khan had been lying with his head between his paws for some time, and he never moved. He was not asleep, for his eyes were open, but he was very still.

"Have you anything to say?" said Father Wolf.

"I have killed no man," said Shere Khan. "There is no need for war between us."

"That is for the pack to say," said Father Wolf. "The man's cub is mine to bring up. If any harm comes to him, there will be war between us."

"There will be war in any case," said Shere Khan. "I have come back to kill him."

"Then there will be war," said Father Wolf. "You have said it."

"Have you anything to say?" said Mother Wolf.

"I have killed no man," said Shere Khan.

"That is for the pack to say," said Mother Wolf. "The man's cub is mine to bring up. If any harm comes to him, there will be war between us."

"There will be war in any case," said Shere Khan. "I have come back to kill him."

"Then there will be war," said Mother Wolf. "You have said it."

"Have you anything to say?" said Father Wolf.

"I have killed no man," said Shere Khan.

"That is for the pack to say," said Father Wolf. "The man's cub is mine to bring up. If any harm comes to him, there will be war between us."

"There will be war in any case," said Shere Khan. "I have come back to kill him."

"Then there will be war," said Father Wolf. "You have said it."

The Pack was called together, and when the word went round that Shere Khan had come back to kill the man's cub, there was great excitement. The wolves were not afraid of Shere Khan, but they did not like to fight him, because he was so big and strong. They had never been beaten in a fight, but they had never fought a tiger before.

At last it was decided that the Pack should meet in full council, and that Shere Khan should be told that the man's cub was under the protection of the Pack, and that if he touched the cub, there would be war.

So the word went round, and when the sun rose, the Pack was assembled in the clearing where the Council Rock stood. Shere Khan came too, and he sat down in his place, but he was not invited to speak.

The Law of the Jungle says that when there is any dispute, the Pack must meet in full council, and that every wolf has a right to speak. So when Father Wolf stood up and told the Pack what had happened, every wolf was silent.

Then Mother Wolf stood up and told her story, and when she had finished, there was not a wolf in the Pack who did not know that the man's cub was under the protection of the Pack, and that if Shere Khan touched him, there would be war.

Then Akela, the Lone Wolf, who was the leader of the Pack, stood up and said: "The man's cub is under the protection of the Pack. If Shere Khan touches him, there will be war."

And all the wolves said "Hear, hear!" and beat the ground with their paws.

Then Shere Khan stood up and said: "I have come back to kill the man's cub. He is a man's child, and a man's cub must be killed."

"That is not the Law of the Jungle," said Akela. "The man's cub is under the protection of the Pack. If you touch him, there will be war."

"I do not care for the Law of the Jungle," said Shere Khan. "I am a tiger, and I will do as I please."

"Then there will be war," said Akela. "You have said it."

And all the wolves said "Hear, hear!" and beat the ground with their paws.

So it was settled. The man's cub was under the protection of the Pack, and if Shere Khan touched him, there would be war.`,
    tags: ["classic", "adventure", "children"]
  }
];

// Function to add demo books to the database
const addDemoBooks = async () => {
  try {
    console.log('Adding demo books to the database...');
    
    // Check if books already exist
    const existingBooks = await Item.find({ title: { $in: demoBooks.map(book => book.title) } });
    
    if (existingBooks.length > 0) {
      console.log('Demo books already exist in the database. Skipping insertion.');
      process.exit(0);
    }
    
    // Insert demo books
    for (const book of demoBooks) {
      const newBook = new Item(book);
      await newBook.save();
      console.log(`Added book: ${book.title}`);
    }
    
    console.log('All demo books added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding demo books:', error);
    process.exit(1);
  }
};

// Run the function
addDemoBooks();