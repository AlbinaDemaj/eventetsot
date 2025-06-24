<?php

namespace Database\Seeders;

use App\Models\Language;
use App\Models\Translation;
use Illuminate\Database\Seeder;

class TranslationSeeder extends Seeder
{
    public function run()
    {
        // Ensure languages exist
        if (Language::count() < 2) {
            $this->call(LanguageSeeder::class);
        }

        $translations = [
        // Hero Section
        'home.hero.title_part1' => [
            'en' => 'Easily collect photos',
            'al' => 'Mblidh lehtësisht fotot'
        ],
        'home.hero.title_part2' => [
            'en' => 'from every guest',
            'al' => 'nga çdo i ftuar'
        ],
        'home.hero.title_part3' => [
            'en' => 'at your',
            'al' => 'në eventin'
        ],
        'home.hero.title_part4' => [
            'en' => 'event',
            'al' => 'tënde'
        ],
        'home.hero.subtitle' => [
            'en' => 'Collect every photo and video from guests in a digital album without apps, without complications, so simple even grandma can use it.',
            'al' => 'Mblidh çdo foto dhe video nga të ftuarit në një album digjital pa aplikacione, pa komplikime, aq e thjeshtë sa edhe gjyshja mund ta përdorë.'
        ],
        'home.hero.cta.primary' => [
            'en' => 'Get Started',
            'al' => 'Filloni'
        ],
        'home.hero.cta.secondary' => [
            'en' => 'Try this demo',
            'al' => 'Provoni këtë demo'
        ],

        // Steps
        'home.steps.1.title' => [
            'en' => 'Step 1',
            'al' => 'Hapi 1'
        ],
        'home.steps.1.description' => [
            'en' => 'Sign up and create your event',
            'al' => 'Regjistrohu dhe krijo eventin tënde'
        ],
        'home.steps.2.title' => [
            'en' => 'Step 2',
            'al' => 'Hapi 2'
        ],
        'home.steps.2.description' => [
            'en' => 'Guests join via link or by scanning QR code',
            'al' => 'Të ftuarit bashkohen me link ose duke skanuar QR-në'
        ],
        'home.steps.3.title' => [
            'en' => 'Step 3',
            'al' => 'Hapi 3'
        ],
        'home.steps.3.description' => [
            'en' => 'Enjoy all the captured moments!',
            'al' => 'Shijo të gjitha momentet e kapura!'
        ],

        // Sharing Section
        'home.sharing.title' => [
            'en' => 'Sharing photos from events has never been easier',
            'al' => 'Shpërndarja e fotove nga eventi nuk ka qenë kurrë më e lehtë'
        ],
        'home.sharing.subtitle' => [
            'en' => 'Collect and share photos and videos with guests in a stunning digital album setup is quick, and sharing takes seconds.',
            'al' => 'Mblidh dhe shpërndaj foto e video me të ftuarit në një album digjital mahnitës konfigurimi është i shpejtë, dhe shpërndarja bëhet në pak sekonda.'
        ],

        // Features
        'home.features.1.title' => [
            'en' => 'Guest Photos and Videos',
            'al' => 'Fotot dhe Videot e të Ftuarve'
        ],
        'home.features.1.description' => [
            'en' => 'Experience your event through the eyes of your guests by collecting every photo and video they take!',
            'al' => 'Përjetoje eventin tënd përmes syve të të ftuarve duke mbledhur çdo foto dhe video që ata bëjnë!'
        ],
        'home.features.2.title' => [
            'en' => 'Text Posts & Captions',
            'al' => 'Postime me Tekst & Përshkrime'
        ],
        'home.features.2.description' => [
            'en' => 'Let guests share messages as decorated text posts or captions alongside their photos and videos.',
            'al' => 'Lejo të ftuarit të ndajnë mesazhe si postime të zbukuruara me tekst apo përshkrime përkrah fotove dhe videove të tyre.'
        ],
        'home.features.3.title' => [
            'en' => 'Extremely Easy to Use',
            'al' => 'Jashtëzakonisht e Lehtë për t\'u Përdorur'
        ],
        'home.features.3.description' => [
            'en' => 'Guests can easily join by clicking the album link or scanning a QR code. No app downloads or registrations required. We created this for those who aren\'t tech-savvy.',
            'al' => 'Të ftuarit mund të bashkohen lehtësisht duke klikuar në linkun e albumit ose duke skanuar një kod QR. Pa shkarkime aplikacionesh apo regjistrime. E kemi krijuar këtë për ata që nuk janë të aftë me teknologjinë.'
        ],

        // How It Works
        'home.how_it_works.title' => [
            'en' => 'How it works?',
            'al' => 'Si funksionon?'
        ],
        'home.how_it_works.subtitle' => [
            'en' => 'Stress-free experience - for you and your guests.',
            'al' => 'Përvojë pa stres – për ty dhe për të ftuarit.'
        ],
        'home.steps.1.heading' => [
            'en' => 'Create your event',
            'al' => 'Krijo eventin tënd'
        ],
        'home.steps.1.description_long' => [
            'en' => 'Create a private digital album where guests can add photos, videos and messages. Customize the title, date, colors and backgrounds to your liking!',
            'al' => 'Krijo një album digjital privat ku të ftuarit mund të shtojnë foto, video dhe mesazhe. Personalizo titullin, datën, ngjyrat dhe sfondet sipas dëshirës tënde!'
        ],
        'home.steps.2.heading' => [
            'en' => 'Share with guests',
            'al' => 'Ndaje me të ftuarit'
        ],
        'home.steps.2.description_long' => [
            'en' => 'Guests can easily view or add photos and videos to your digital album by scanning the unique QR code or using the album link - before, during and after the event!',
            'al' => 'Të ftuarit mund të shikojnë ose të shtojnë lehtësisht foto dhe video në albumin tënd digjital duke skanuar QR kodin unik ose duke përdorur linkun e albumit — para, gjatë dhe pas eventit!'
        ],
        'home.steps.2.bullets.1' => [
            'en' => 'Share as a link via email, SMS, chat apps etc.',
            'al' => 'Ndaje si link përmes email-it, SMS-it, aplikacioneve të bisedës etj.'
        ],
        'home.steps.2.bullets.2' => [
            'en' => 'Share as QR code on printed cards and signs.',
            'al' => 'Ndaje si QR kod në karta të printuara dhe tabela.'
        ],
        'home.steps.2.bullets.3' => [
            'en' => 'No app downloads. No registration required.',
            'al' => 'Pa shkarkime aplikacionesh. Pa nevojë për regjistrim.'
        ],
        'home.steps.3.heading' => [
            'en' => 'Enjoy all the captured moments',
            'al' => 'Shijo të gjitha momentet e kapura'
        ],
        'home.steps.3.description_long' => [
            'en' => 'At any time you can view all photos and videos captured by your guests in your digital album. Go back and save those unforgettable memories!',
            'al' => 'Në çdo moment mund të shikosh të gjitha fotot dhe videot e kapura nga të ftuarit në albumin tënd digjital. Rikthehu dhe ruaji ato kujtime të paharrueshme!'
        ],
        'home.steps.3.bullets.1' => [
            'en' => 'Every moment is saved in a stunning digital album.',
            'al' => 'Çdo moment ruhet në një album digjital mahnitës.'
        ],
        'home.steps.3.bullets.2' => [
            'en' => 'Download everything with one click as a zipped folder.',
            'al' => 'Shkarko gjithçka me një klikim si një dosje të kompresuar (zip).'
        ],

        // Features Slider
        'home.features_slider.title' => [
            'en' => 'Everything you need for a perfect event',
            'al' => 'Gjithçka që ju duhet për një event perfekt'
        ],
        'home.features_slider.subtitle' => [
            'en' => 'From digital albums to QR code templates - everything is ready for you.',
            'al' => 'Nga albumet digjitale deri te modelet e kodeve QR – çdo gjë është e përgatitur për ju.'
        ],
        'home.features_slider.1.title' => [
            'en' => 'Digital Album',
            'al' => 'Album Digjital'
        ],
        'home.features_slider.1.description' => [
            'en' => 'All photos and videos are automatically saved in a digital album that you can access at any time.',
            'al' => 'Të gjitha fotot dhe videot ruhen automatikisht në një album digjital, të cilin mund ta aksesosh në çdo kohë.'
        ],
        'home.features_slider.2.title' => [
            'en' => 'One-click download',
            'al' => 'Shkarkim me një klik'
        ],
        'home.features_slider.2.description' => [
            'en' => 'With just one click, you can download all photos to your device or save them directly to the cloud.',
            'al' => 'Me vetëm një klikim, mund t\'i shkarkosh të gjitha fotot në pajisjen tënde ose t\'i ruash direkt në cloud.'
        ],
        'home.features_slider.3.title' => [
            'en' => 'No Apps Required',
            'al' => 'Pa Nevojë për Aplikacione'
        ],
        'home.features_slider.3.description' => [
            'en' => 'Neither you nor your guests need to waste time with downloads to participate.',
            'al' => 'As ti dhe as të ftuarit nuk keni nevojë të humbni kohë me shkarkime për të marrë pjesë.'
        ],

        // FAQ Section
        'home.faq.title' => [
            'en' => 'Questions?',
            'al' => 'Pyetje?'
        ],
        'home.faq.subtitle' => [
            'en' => 'Find answers to common questions about our services, therapy and mental well-being.',
            'al' => 'Gjeni përgjigje për pyetjet e zakonshme në lidhje me shërbimet tona, terapinë dhe mirëqenien mendore.'
        ],
        'home.faq.1.question' => [
            'en' => 'Do guests need to download any app to participate?',
            'al' => 'A duhet të shkarkojnë të ftuarit ndonjë aplikacion për të marrë pjesë?'
        ],
        'home.faq.1.answer' => [
            'en' => 'No, no apps or account registration is needed. Unlike other photo sharing apps, EventetSot doesn\'t require such effort from your guests. They can easily participate by entering a URL or scanning the unique QR code we created for you. From there, the upload process is very simple. It\'s so easy to use that even grandma can do it. No kidding.',
            'al' => 'Jo, nuk ka nevojë për aplikacione apo regjistrim të llogarisë. Ndryshe nga aplikacionet e tjera për ndarjen e fotove, EventetSot nuk kërkon përpjekje të tilla nga të ftuarit tuaj. Ata mund të marrin pjesë lehtësisht duke futur një URL ose duke skanuar QR kodin unik që krijuam për ju. Nga aty, procesi i ngarkimit është shumë i thjeshtë. Është aq e lehtë për t\'u përdorur, sa edhe gjyshja mund ta bëjë. Pa shaka.'
        ],
        'home.faq.2.question' => [
            'en' => 'Can I download all guest photos and videos?',
            'al' => 'A mund t\'i shkarkoj të gjitha fotot dhe videot e të ftuarve?'
        ],
        'home.faq.2.answer' => [
            'en' => 'Yes! You can download each photo or video individually, or use bulk download to get all files in a zipped folder. Then, you\'re free to save them wherever you want, print them or use them as you wish. Guests can also easily download and share them on social networks (unless you disable this option).',
            'al' => 'Po! Mund të shkarkosh çdo foto apo video individualisht, ose të përdorësh shkarkimin në grup për të marrë të gjitha skedarët në një dosje të kompresuar (ZIP). Pastaj, je i lirë t\'i ruash ku të duash, t\'i printosh apo t\'i përdorësh sipas dëshirës. Edhe të ftuarit mund t\'i shkarkojnë dhe t\'i ndajnë në rrjete sociale me lehtësi (përveç nëse e çaktivizon këtë mundësi).'
        ],
        'home.faq.3.question' => [
            'en' => 'Why is it better than other photo sharing apps?',
            'al' => 'Pse është më mirë se aplikacionet e tjera për ndarjen e fotove?'
        ],
        'home.faq.3.answer' => [
            'en' => 'Google Photos, Dropbox, chat groups, emails (or similar apps) can be used to collect photos from events - no doubt. But the upload process there is often complicated. There are many steps, buttons, sometimes login or app download is required. Moreover, customization options are limited and photo quality is reduced. Overall, it\'s not the best experience for you and your guests. That\'s exactly why we created EventetSot - to simplify the process of collecting photos and videos from guests at events. We made it easy and fun, with features like live slideshow, QR code login and decorated text posts, to name a few. While these other apps might work, they can result in a slow experience with fewer photos. If you like that, no problem. But if you want the best experience for yourself and your guests, try EventetSot.',
            'al' => 'Google Photos, Dropbox, grupet në chat, email-et (apo aplikacione të ngjashme) mund të përdoren për të mbledhur foto nga eventi – nuk ka dyshim. Por procesi i ngarkimit atje shpesh është i ndërlikuar. Ka shumë hapa, butona, ndonjëherë kërkohet hyrje ose shkarkim aplikacioni. Për më tepër, mundësitë e personalizimit janë të kufizuara dhe cilësia e fotove ulet. Në përgjithësi, nuk është përvoja më e mirë për ty dhe për të ftuarit. Pikërisht për këtë arsye krijuam EventetSot – për ta thjeshtuar procesin e mbledhjes së fotove dhe videove nga të ftuarit në evente. E bëmë të lehtë dhe argëtuese, me veçori si slideshow live, hyrje përmes QR kodi dhe postime të zbukuruara me tekst, për të përmendur vetëm disa. Ndërkohë që këto aplikacione të tjera mund të funksionojnë, ato mund të rezultojnë në një përvojë të ngadaltë dhe më pak foto. Nëse të pëlqen kjo, pa problem. Por nëse dëshiron përvojën më të mirë për veten dhe të ftuarit, provo EventetSot.'
        ],
        'home.faq.4.question' => [
            'en' => 'Can I print the QR code on signs or boards?',
            'al' => 'A mund ta printoj QR kodin në tabela ose shenja?'
        ],
        'home.faq.4.answer' => [
            'en' => 'Yes! Many event organizers do this. Print the QR code and place it on tables or at the entrance with a sign like "Scan here!". Guests can scan the code and upload photos to your digital album easily.',
            'al' => 'Po! Shumë organizatorë eventesh e bëjnë këtë. Printoni QR kodin dhe vendoseni në tavolina ose në hyrje me një shenjë si "Skanoni këtu!". Të ftuarit mund ta skanojnë kodin dhe të ngarkojnë fotot në albumin tuaj digjital me lehtësi.'
        ],
        'home.faq.5.question' => [
            'en' => 'My event lasts more than one day, can I use EventetSot?',
            'al' => 'Eventi im zgjat më shumë se një ditë, a mund ta përdor EventetSot?'
        ],
        'home.faq.5.answer' => [
            'en' => 'Yes! We support events that last several days. Check our plans and choose the one that matches your event duration. The Photo Wall is a live slideshow that displays all uploads from guests - photos, videos and text posts. It updates in real time with each new upload. It\'s not mandatory for photo collection, but if you want more interactivity at your event, we highly recommend it! It can be accessed via a link, meaning it can be displayed on any device with a browser and internet connection. You can connect it to projectors, smart TVs, tablets etc. via cables or with devices like Chromecast or Apple TV.',
            'al' => 'Po! Mbështesim evente që zgjasin disa ditë. Shikoni planet tona dhe zgjidhni atë që përputhet me kohëzgjatjen e eventit tuaj. Muri i Fotove është një slideshow i drejtpërdrejtë që shfaq të gjitha ngarkimet nga të ftuarit – foto, video dhe postime me tekst. Ai përditësohet në kohë reale me çdo ngarkim të ri. Nuk është i detyrueshëm për mbledhjen e fotove, por nëse doni më shumë interaktivitet në event, e rekomandojmë shumë! Mund të aksesohet përmes një linku, që do të thotë se mund të shfaqet në çdo pajisje me shfletues dhe lidhje interneti. Mund ta lidhni me projektorë, TV të zgjuar, tableta etj. përmes kabllove ose me pajisje si Chromecast apo Apple TV.'
        ],
        'home.faq.6.question' => [
            'en' => 'Are my photos private?',
            'al' => 'A janë private fotot e mia?'
        ],
        'home.faq.6.answer' => [
            'en' => 'Yes, your uploads are private and shared only with people you choose. We don\'t use, own or interact with your photos in any way. They\'re yours alone.',
            'al' => 'Po, ngarkimet tuaja janë private dhe ndahen vetëm me personat që ju zgjidhni. Ne nuk i përdorim, nuk i posedojmë dhe nuk ndërveprojmë me fotot tuaja në asnjë mënyrë. Janë vetëm tuajat.'
        ],
        'home.faq.7.question' => [
            'en' => 'We already have a photographer, should we still use it?',
            'al' => 'Ne tashmë kemi fotograf, a duhet ta përdorim gjithsesi?'
        ],
        'home.faq.7.answer' => [
            'en' => 'Your photographer will certainly capture wonderful moments, but it\'s impossible for them to be everywhere. Guests can also capture precious moments that show the more authentic side of the event. Moreover, the photographer can upload the photos they take during the event, which will appear on the Photo Wall/digital album. How beautiful is that? While EventetSot doesn\'t replace a professional photographer, many couples have used it as a more affordable alternative.',
            'al' => 'Fotografi juaj sigurisht që do të kapë momente të mrekullueshme, por është e pamundur të jetë kudo. Të ftuarit mund të kapin gjithashtu momente të çmuara që tregojnë anën më autentike të eventit. Për më tepër, fotografi mund të ngarkojë fotot që merr gjatë eventit, të cilat do të shfaqen në Muri i Fotove / albumin digjital. Sa bukur është kjo? Edhe pse EventetSot nuk zëvendëson një fotograf profesionist, shumë çifte e kanë përdorur si një alternativë më të përballueshme.'
        ],
        'home.faq.8.question' => [
            'en' => 'What if someone shares an inappropriate photo?',
            'al' => 'Po nëse dikush ndan një foto të papërshtatshme?'
        ],
        'home.faq.8.answer' => [
            'en' => 'Our system automatically detects most inappropriate photos. Also, you can manually delete any photo or video from your panel that can be accessed from any device with your account. From our experience (over 50,000 events), guests behave respectfully. However, if you\'re organizing a large public event (like a conference) and are concerned about inappropriate behavior, you can enable the moderation feature, where every upload needs to be approved by you (except those from trusted people).',
            'al' => 'Sistemi ynë zbulon automatikisht shumicën e fotove të papërshtatshme. Gjithashtu, ju mund të fshini çdo foto apo video manualisht nga paneli juaj që mund të aksesohet nga çdo pajisje me llogarinë tuaj. Nga përvoja jonë (mbi 50,000 evente), të ftuarit sillen me respekt. Megjithatë, nëse po organizoni një event publik të madh (si konferencë) dhe shqetësoheni për sjellje të papërshtatshme, mund të aktivizoni funksionin e moderimit, ku çdo ngarkim duhet të miratohet nga ju (përveç atyre nga njerëz të besuar).'
        ],
        'home.faq.9.question' => [
            'en' => 'Does this work everywhere in the world?',
            'al' => 'A funksionon kjo kudo në botë?'
        ],
        'home.faq.9.answer' => [
            'en' => 'Yes, our platform works globally. Guests only need an internet connection.',
            'al' => 'Po, platforma jonë funksionon globalisht. Të ftuarit kanë nevojë vetëm për lidhje interneti.'
        ],

        // Demo Section
        'home.demo.title' => [
            'en' => 'Try This Yourself',
            'al' => 'Provoni Vetë'
        ],
        'home.demo.subtitle' => [
            'en' => 'Here, you can get a glimpse of how we works and what the guest experience would be like.',
            'al' => 'Këtu, mund të shihni se si funksionon dhe si do të jetë përvoja e të ftuarve.'
        ],
        'home.demo.step1' => [
            'en' => 'Scan the QR code or enter the Link to open the digital album.',
            'al' => 'Skanoni QR kodin ose vendosni Linkun për të hapur albumin digjital.'
        ],
        'home.demo.step2' => [
            'en' => 'Upload a Post/Photo/Video and view it on the digital album and photo wall in real-time.',
            'al' => 'Ngarkoni një Postim/Foto/Video dhe shikojeni në albumin digjital dhe murin e fotove në kohë reale.'
        ],
        'home.demo.qr_label' => [
            'en' => 'Scan with your phone\'s camera',
            'al' => 'Skanoni me kamerën e telefonit tuaj'
        ],

            // Pricing Section
            'pricing.title' => [
                'en' => 'Pricing',
                'al' => 'Çmimet'
            ],
            'pricing.subtitle' => [
                'en' => 'Choose the plan that best fits your event.',
                'al' => 'Zgjidhni planin që i përshtatet më së miri ngjarjes suaj.'
            ],
            'pricing.plan1.description' => [
                'en' => 'Excellent for birthdays, family gatherings and other small events.',
                'al' => 'E shkëlqyeshme për ditëlindje, mbledhje familjare dhe ngjarje apo raste të tjera të vogla.'
            ],
            'pricing.plan1.features.1' => [
                'en' => 'Up to 20 photo and video uploads',
                'al' => 'Deri në 20 ngarkime fotosh dhe videosh'
            ],
            'pricing.plan1.features.2' => [
                'en' => 'Unlimited guests and participants',
                'al' => 'Të ftuar dhe pjesëmarrës të pakufizuar'
            ],
            'pricing.plan1.features.3' => [
                'en' => 'Uploads stored for 7 days',
                'al' => 'Ngarkimet ruhen për 7 ditë'
            ],
            'pricing.plan1.features.4' => [
                'en' => 'Basic customization options',
                'al' => 'Opsione bazë për personalizim'
            ],
            'pricing.plan1.features.5' => [
                'en' => 'Active for 3 hours from event date',
                'al' => 'Aktive për 3 orë nga data e eventit'
            ],
            'pricing.plan1.features.6' => [
                'en' => 'All uploads stored in good quality',
                'al' => 'Të gjitha ngarkimet ruhen në cilësi të mirë'
            ],
            'pricing.plan2.description' => [
                'en' => 'Ideal for large weddings, conferences, concerts, parties and public events.',
                'al' => 'Ideale për dasma të mëdha, konferenca, koncerte, festa dhe eventet publike.'
            ],
            'pricing.plan2.features.1' => [
                'en' => 'Unlimited photo and video uploads',
                'al' => 'Ngarkime të pakufizuara të fotove dhe videove'
            ],
            'pricing.plan2.features.2' => [
                'en' => 'Unlimited guests and participants',
                'al' => 'Të ftuar dhe pjesëmarrës të pakufizuar'
            ],
            'pricing.plan2.features.3' => [
                'en' => 'Uploads stored for 6 months',
                'al' => 'Ngarkimet ruhën për 6 muaj'
            ],
            'pricing.plan2.features.4' => [
                'en' => 'Advanced customization options',
                'al' => 'Opsione të avancuara për personalizim'
            ],
            'pricing.plan2.features.5' => [
                'en' => 'Active for 30 days from event date',
                'al' => 'Aktive për 30 ditë nga data e eventit'
            ],
            'pricing.plan2.features.6' => [
                'en' => 'All uploads stored in high quality',
                'al' => 'Të gjitha ngarkimet ruhën në cilësi të lartë'
            ],
            'pricing.plan2.features.7' => [
                'en' => 'Download all photos and videos instantly',
                'al' => 'Shkarkoni të gjitha fotot dhe videot menjëherë'
            ],
            'pricing.cta' => [
                'en' => 'Create Your Event',
                'al' => 'Krijoni Eventin Tuaj'
            ],
            'pricing.footer_note' => [
                'en' => 'Prices are in euros. All our plans are subject to our terms of use and fair use policy.',
                'al' => 'Çmimet janë në euro. Të gjitha planet tona i nënshtrohen kushteve tona të përdorimit dhe politikës së përdorimit të drejtë.'
            ],
            // Contact Form Section
            'contact.title' => [
                'en' => 'Complaints or Suggestions',
                'al' => 'Ankesa apo Sygjerime'
            ],
            'contact.form.full_name' => [
                'en' => 'Full Name:',
                'al' => 'Emri Mbiemri:'
            ],
            'contact.form.full_name_placeholder' => [
                'en' => 'Full Name',
                'al' => 'Emri Mbiemri'
            ],
            'contact.form.email' => [
                'en' => 'Email:',
                'al' => 'Email:'
            ],
            'contact.form.email_placeholder' => [
                'en' => 'Email',
                'al' => 'Email'
            ],
            'contact.form.phone' => [
                'en' => 'Contact Number:',
                'al' => 'Numri i Kontaktit:'
            ],
            'contact.form.phone_placeholder' => [
                'en' => 'Contact Number',
                'al' => 'Numri i Kontaktit'
            ],
            'contact.form.message' => [
                'en' => 'Complaint or Suggestion:',
                'al' => 'Ankesa apo Sygjerimi:'
            ],
            'contact.form.message_placeholder' => [
                'en' => 'Complaint or Suggestion',
                'al' => 'Ankesa apo Sygjerimi'
            ],
            'contact.form.submit' => [
                'en' => 'Send',
                'al' => 'Dërgo'
            ],

            // About Us Section
            'about.title' => [
                'en' => 'About Us',
                'al' => 'Rreth Nesh'
            ],
            'about.paragraph1' => [
                'en' => 'eventetsot is a modern platform created to give every event a unique and unforgettable digital experience. We enable you to collect, share and preserve the most beautiful memories from weddings, parties or any type of event - in a simple, creative way without additional apps.',
                'al' => 'eventetsot. është një platformë moderne e krijuar për t\'i dhënë çdo eventeve një përvojë digjitale unike dhe të paharrueshme. Ne ju mundësojmë që të mblidhni, ndani dhe ruani kujtimet më të bukura nga dasmat, festat apo çdo lloj eventi – në një mënyrë të thjeshtë, kreative dhe pa aplikacione shtesë.'
            ],
            'about.paragraph2' => [
                'en' => 'Through a unique QR code or personalized link, your guests can upload photos, videos or messages directly to the digital album.',
                'al' => 'Me anë të një QR kodi unik ose një linku të personalizuar, të ftuarit tuaj mund të ngarkojnë foto, video apo mesazhe drejtpërdrejt në albumin digjital.'
            ],
            'about.paragraph3' => [
                'en' => 'Our mission is to bring technology closer to emotions - making every important moment easy to preserve and share.',
                'al' => 'Misioni ynë është të sjellim teknologjinë më afër emocioneve – duke e bërë çdo moment të rëndësishëm të ruhet dhe të shpërndahet me lehtësi.'
            ],

            // Header Section
            'header.home' => [
                'en' => 'Home',
                'al' => 'Ballina'
            ],
            'header.pricing' => [
                'en' => 'Pricing',
                'al' => 'Abonimi'
            ],
            'header.login' => [
                'en' => 'Login',
                'al' => 'Kyçu'
            ],
            'header.get_started' => [
                'en' => 'Get Started',
                'al' => 'Filloni'
            ],

            // Footer Section
            'footer.client_center' => [
                'en' => 'CLIENT CENTER',
                'al' => 'QENDRA E KLIENTIT'
            ],
            'footer.faq' => [
                'en' => 'Frequently Asked Questions',
                'al' => 'Pyetjet më të shpeshta'
            ],
            'footer.complaints' => [
                'en' => 'Complaints and Suggestions',
                'al' => 'Ankesa dhe Sygjerime'
            ],
            'footer.about' => [
                'en' => 'About Us',
                'al' => 'Rreth Nesh'
            ],
            'footer.social' => [
                'en' => 'Social Networks',
                'al' => 'Rrjetet Sociale'
            ],
            'footer.copyright' => [
                'en' => '© 2025 eventetsot.com',
                'al' => '© 2025 eventetsot.com'
            ],
            'footer.contact' => [
                'en' => 'Contact',
                'al' => 'Kontakto'
            ],

            // Event Page Translations
            'event.add_album' => [
                'en' => 'Add Album',
                'al' => 'Shtoni Album'
            ],
            'event.media_count' => [
                'en' => 'photos, videos and posts',
                'al' => 'Fotografitë, videot dhe postimet'
            ],
            'event.video_unsupported' => [
                'en' => 'Your browser does not support the video tag.',
                'al' => 'Shfletuesi juaj nuk mbështet tagun e videos.'
            ],

            // Upload Page Translations
            'upload.back_to_album' => [
                'en' => 'Back to Album',
                'al' => 'Kthehu te Albumi'
            ],
            'upload.select_files' => [
                'en' => 'Select Photos and Videos',
                'al' => 'Zgjidh Fotografitë dhe videot'
            ],
            'upload.or_add_text' => [
                'en' => 'Or add a',
                'al' => 'Ose shtoni një'
            ],
            'upload.text_post' => [
                'en' => 'text post',
                'al' => 'postim tekstual'
            ],
            'upload.add_more' => [
                'en' => 'Add More',
                'al' => 'Shto Më Shumë'
            ],
            'upload.final_upload' => [
                'en' => 'Upload Item(s)',
                'al' => 'Ngarko Artikull(in)'
            ],

            // Modal Translations
            'modal.text_post.title' => [
                'en' => 'Create Text Post',
                'al' => 'Krijo Postim Tekstual'
            ],
            'modal.text_post.placeholder' => [
                'en' => "What's on your mind?",
                'al' => 'Çfarë po mendoni?'
            ],
            'modal.text_post.add_button' => [
                'en' => 'Add Post',
                'al' => 'Shto Postimin'
            ],
            'modal.text_post.cancel' => [
                'en' => 'Cancel',
                'al' => 'Anulo'
            ],
            'modal.caption.title' => [
                'en' => 'Add Caption',
                'al' => 'Shto mbishkrim'
            ],
            'modal.caption.text_placeholder' => [
                'en' => 'Write a caption for this photo here',
                'al' => 'Shkruani një përshkrim për këtë foto këtu'
            ],
            'modal.caption.name_placeholder' => [
                'en' => 'Name',
                'al' => 'Emri'
            ],
            'modal.caption.save_button' => [
                'en' => 'Save Caption',
                'al' => 'Ruaj Përshkrimin'
            ],

            // Header Translations
            'header.home' => [
                'en' => 'Home',
                'al' => 'Ballina'
            ],
            'header.pricing' => [
                'en' => 'Pricing',
                'al' => 'Abonimi'
            ],
            'header.login' => [
                'en' => 'Login',
                'al' => 'Kyçu'
            ],
            'header.get_started' => [
                'en' => 'Get Started',
                'al' => 'Filloni'
            ],

            // Gallery Translations
            'gallery.add_caption' => [
                'en' => 'Add Caption',
                'al' => 'Shto Përshkrim'
            ],
            'gallery.caption_added' => [
                'en' => 'Caption Added',
                'al' => 'Përshkrim i Shtuar'
            ],
            'gallery.add_photos' => [
                'en' => 'Add Photos',
                'al' => 'Shto Foto'
            ],
            'gallery.upload_items' => [
                'en' => 'Upload :count Item|Upload :count Items',
                'al' => 'Ngarko :count Artikull|Ngarko :count Artikuj'
            ],

            'modal.caption.text_label' => [
                'en' => 'Caption',
                'al' => 'Përshkrim'
            ],
            'modal.caption.name_label' => [
                'en' => 'Name',
                'al' => 'Emri'
            ],

            // Event Welcome Page Translations
            'event_welcome.default_description' => [
                'en' => 'Please share your photos and videos with us for this special day!',
                'al' => 'Ju lutemi ndani fotot dhe videot tuaja me ne për këtë ditë të veçantë!'
            ],
            'event_welcome.name_placeholder' => [
                'en' => 'Enter Your Name Here',
                'al' => 'Shkruani Emrin Këtu'
            ],
            'event_welcome.continue_button' => [
                'en' => 'Continue',
                'al' => 'Vazhdo'
            ],
            'welcome_title' => [
                'en' => 'Welcome to Eventesot.',
                'al' => 'Mirë se vini në Eventesot.'
            ],
            'welcome_subtitle' => [
                'en' => 'Easily gather every guest\'s photos and videos into a shareable live slideshow',
                'al' => 'Mblidhni lehtësisht fotot dhe videot e çdo mysafiri në një slideshow të drejtpërdrejtë të ndashëm'
            ],
            'login' => [
                'en' => 'Login',
                'al' => 'In-Kyçu'
            ],
            'register' => [
                'en' => 'Sign Up',
                'al' => 'Up-Regjistrohu'
            ],
            'email' => [
                'en' => 'Email',
                'al' => 'Email'
            ],
            'password' => [
                'en' => 'Password',
                'al' => 'Fjalkalimi'
            ],
            'forgot_password' => [
                'en' => 'Forgot your password?',
                'al' => 'Harrove fjalkalimin?'
            ],
            'submit_login' => [
                'en' => 'Login',
                'al' => 'Hyr'
            ],
            'name' => [
                'en' => 'Name',
                'al' => 'Emri'
            ],
            'name_placeholder' => [
                'en' => 'Enter Name',
                'al' => 'Shkruaj Emrin'
            ],
            'email_placeholder' => [
                'en' => 'Enter Email',
                'al' => 'Shkruaj Email'
            ],
            'password_placeholder' => [
                'en' => 'Enter Password',
                'al' => 'Shkruaj Fjalkalimin'
            ],
            'confirm_password' => [
                'en' => 'Confirm Password',
                'al' => 'Konfirmo Fjalkalimin'
            ],
            'create_account' => [
                'en' => 'Create Account',
                'al' => 'Krijo Llogarinë'
            ],
            'verify_email_title' => [
                'en' => 'Verify Your Email Address',
                'al' => 'Verifiko Adresën tuaj të Emailit'
            ],
            'fresh_link_sent' => [
                'en' => 'A fresh verification link has been sent to your email address.',
                'al' => 'Një lidhje e re verifikimi është dërguar në adresën tuaj të emailit.'
            ],
            'check_email_message' => [
                'en' => 'Before proceeding, please check your email for a verification link.',
                'al' => 'Para se të vazhdoni, ju lutemi kontrolloni emailin tuaj për një lidhje verifikimi.'
            ],
            'not_received_email' => [
                'en' => 'If you did not receive the email',
                'al' => 'Nëse nuk keni marrë emailin'
            ],
            'request_another_link' => [
                'en' => 'Click here to request another',
                'al' => 'Kliko këtu për të kërkuar një tjetër'
            ],
            'password_label' => [
                'en' => 'Password',
                'al' => 'Fjalkalimi'
            ],
            'confirm_password_button' => [
                'en' => 'Confirm Password',
                'al' => 'Konfirmo Fjalkalimin'
            ],
            'dont_have_account' => [
                'en' => 'Don\'t Have account',
                'al' => 'Nuk keni llogari'
            ],
            'sign_up' => [
                'en' => 'Sign Up',
                'al' => 'Regjistrohu'
            ],
            'email_label' => [
                'en' => 'Email',
                'al' => 'Email'
            ],
            'reset_instructions_button' => [
                'en' => 'Reset Instructions',
                'al' => 'Udhëzime për Rikthim'
            ],
            'confirm_password_label' => [
                'en' => 'Confirm Password',
                'al' => 'Konfirmo Fjalkalimin'
            ],
            'reset_password_button' => [
                'en' => 'Reset Password',
                'al' => 'Rikthe Fjalkalimin'
            ],
    ];

        foreach ($translations as $key => $languageValues) {
            $translation = Translation::firstOrCreate([
                'group' => 'website',
                'key' => $key
            ]);

            foreach ($languageValues as $langCode => $value) {
                // Map 'al' to 'sq' for language code if needed
                $dbLangCode = $langCode === 'al' ? 'sq' : $langCode;

                $language = Language::where('code', $dbLangCode)->first();

                if ($language) {
                    $translation->items()->updateOrCreate(
                        ['language_id' => $language->id],
                        ['value' => $value]
                    );
                }
            }
        }

        $this->command->info('Website translations seeded successfully!');
    }
}
