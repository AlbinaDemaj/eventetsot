@extends('website.layouts.app')

@section('content')
    <section class="master-head d-flex align-items-center">
        <div class="container">
            <div class="caption">
                <h1>Mblidh lehtësisht fotot<br> 
                    <strong>nga çdo i ftuar  <br>
                      në eventin  <span class="e-text-primary">tënde</span> <img src="website/img/heart.svg">
                    </strong>
                </h1>
                <p>Mblidh çdo foto dhe video nga të ftuarit në një album digjital pa aplikacione, pa komplikime, aq e thjeshtë sa edhe
                    gjyshja mund ta përdorë.</p>
                <div class="d-flex gap-2 slider_btn">
                    <a href="#" class="btn e-btn-primary">Filloni</a>
                    <a href="#" class="btn e-btn-ghost action-sheet-t">Provoni këtë demo</a>
                </div>
                <div class="d-flex flex-wrap gap-4 mt-4 e-steps">
                    <div class="d-flex gap-2 align-items-center">
                      <div class="icon"><img src="website/img/step-1.png"></div>
                      <div class="txt"><strong class="d-block">Hapi 1</strong> Regjistrohu dhe krijo eventin tënde</div>
                    </div>
                    <div class="d-flex gap-2 align-items-center">
                      <div class="icon"><img src="website/img/step-2.png"></div>
                      <div class="txt"><strong class="d-block">Hapi 2</strong> Të ftuarit bashkohen me link ose duke skanuar QR-në</div>
                    </div>
                    <div class="d-flex gap-2 align-items-center">
                      <div class="icon"><img src="website/img/step-3.png"></div>
                      <div class="txt"><strong class="d-block">Hapi 3</strong> Shijo të gjitha momentet e kapura!</div>
                    </div>
                  </div>
            </div>
        </div>
    </section>

    <div class="c-heading">
        <div class="container">
          <h2>Shpërndarja e fotove nga eventi nuk ka qenë kurrë më e lehtë</h2>
          <p>Mblidh dhe shpërndaj foto e video me të ftuarit në një album digjital mahnitës  <br> konfigurimi është i shpejtë, dhe
          shpërndarja bëhet në pak sekonda.</p>
        </div>
    </div>

    <section class="e-sharing">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-4 text-center mbl-view">
              <video class="appDemo mw-100" autoplay="" loop="" muted="" playsinline="" poster="website/img/wedding-demo-poster.jpg"
                src="website/img/video-1.mp4">
              </video>
            </div>
            <div class="col-md-4">
              <div class="box-item">
                <div class="icon-span">
                  <img src="website/img/guest-photos.svg">
                </div>
                <strong>Fotot dhe Videot e të Ftuarve</strong>
                <p>Përjetoje eventin tënd përmes syve të të ftuarve duke mbledhur çdo foto dhe video që ata bëjnë!</p>
              </div>
              <div class="box-item ">
                <div class="icon-span">
                  <img src="website/img/posts.svg">
                </div>
                <strong>Postime me Tekst & Përshkrime</strong>
                <p>Lejo të ftuarit të ndajnë mesazhe si postime të zbukuruara me tekst apo përshkrime përkrah fotove dhe videove të tyre.</p>
              </div>
            </div>
            <div class="col-md-4 text-center desktop-view">
                <video class="appDemo mw-100" autoplay="" loop="" muted="" playsinline="" poster="website/img/wedding-demo-poster.jpg" src="website/img/video-1.mp4">
                </video>
            </div>
            <div class="col-md-4">
              <div class="box-item box-mobile">
                <div class="icon-span">
                  <img src="website/img/usage.svg">
                </div>
                <strong>Jashtëzakonisht e Lehtë për t’u Përdorur</strong>
                <p>Të ftuarit mund të bashkohen lehtësisht duke klikuar në linkun e albumit ose duke skanuar një kod QR. Pa shkarkime
                aplikacionesh apo regjistrime. E kemi krijuar këtë për ata që nuk janë të aftë me teknologjinë.</p>
              </div>
             
            </div>
          </div>
        </div>
      </section>

   
    <section class="how-it-works">
        <div class="container">
          <div class="c-heading">
            <div class="container">
              <h2>Si funksionon?</h2>
              <p>Përvojë pa stres – për ty dhe për të ftuarit.</p>
            </div>
          </div>
          <div class="row how-works-box align-items-center">
            <div class="tbox col-md-6">
              <span class="ecount">1</span>
              <h4>Krijo eventin tënd</h4>
              <p>Krijo një album digjital privat ku të ftuarit mund të shtojnë foto, <br />video dhe mesazhe.Personalizo titullin, datën,
              ngjyrat dhe <br /> sfondet sipas dëshirës tënde!</p>
              </div>
              <div class="col-md-6">
                <img src="website/img/sideimage-1.png" class="img-fluid">
              </div>
            </div>
            <div class="row how-works-box align-items-center">
              <div class="col-md-6 d-md-block d-none">
                <video class="appDemo mw-100" autoplay="" loop="" muted="" playsinline="" poster="website/img/sidevidimg-1.png" src="website/img/sidevid-2.webm"></video>
              </div>
              <div class="tbox col-md-6">
                <span class="ecount">2</span>
                <h4>Ndaje me të ftuarit</h4>
                <p>Të ftuarit mund të shikojnë ose të shtojnë lehtësisht foto dhe video në albumin tënd digjital duke skanuar QR kodin unik
                ose duke përdorur linkun e albumit — para, gjatë dhe pas eventit!
              <ul>
                <li>Ndaje si link përmes email-it, SMS-it, aplikacioneve të bisedës etj.</li>
                <li>Ndaje si QR kod në karta të printuara dhe tabela.</li>
                <li>Pa shkarkime aplikacionesh. Pa nevojë për regjistrim.</li>
              </ul></p>
              </div>
              <div class="col-md-6 d-md-none">
                <video class="appDemo mw-100" autoplay="" loop="" muted="" playsinline="" poster="website/img/sidevidimg-1.png" src="website/img/sidevid-2.webm"></video>
              </div>
            </div>
            <div class="row works-how align-items-center">
              
              <div class="tbox col-md-6">
                <span class="ecount">3</span>
                <h4>Shijo të gjitha momentet e kapura</h4>
                <p>Në çdo moment mund të shikosh të gjitha fotot dhe videot e kapura nga të ftuarit në albumin tënd digjital. Rikthehu dhe
                ruaji ato kujtime të paharrueshme!
              <ul>
                <li>Çdo moment ruhet në një album digjital mahnitës.</li>
                <li>Shkarko gjithçka me një klikim si një dosje të kompresuar (zip).</li>
              </ul></p>
              </div>
              <div class="col-md-6 d-md-block d-none">
                <img src="website/img/sideimg-2.png" class="img-fluid">
              </div>
              <div class="col-md-6 d-md-none">
                <img src="website/img/sideimg-2.png" class="img-fluid">
              </div>
            </div>
          </div>
    </section>

    <section class="ecarousel">
        <div class="c-heading">
          <div class="container">
            <h2>Gjithçka që ju duhet për një event perfekt</h2>
            <p>Nga albumet digjitale deri te modelet e kodeve QR – çdo gjë është e përgatitur për ju.</p>
          </div>
        </div>
        <div class="container">
          <div class="arrowbox a"></div>
          <div class="eslider a">
            <div class="ebox">
              <div class="p-4">
                <span class="circle-icon"><img src="website/img/digital-album.svg"></span>
                <span class="title">Album Digjital</span>
                <p>Të gjitha fotot dhe videot ruhen automatikisht në një album digjital, të cilin mund ta aksesosh në çdo kohë.</p>
              </div>
            </div>
            <div class="ebox">
              <div class="p-4">
                <span class="circle-icon"><img src="website/img/digital-album.svg"></span>
                <span class="title">Shkarkim me një klik</span>
                <p>Me vetëm një klikim, mund t’i shkarkosh të gjitha fotot në pajisjen tënde ose t’i ruash direkt në cloud.</p>
              </div>
            </div>
            <div class="ebox">
              <div class="p-4">
                <span class="circle-icon"><img src="website/img/digital-album.svg"></span>
                <span class="title">Pa Nevojë për Aplikacione</span>
                <p>As ti dhe as të ftuarit nuk keni nevojë të humbni kohë me shkarkime për të marrë pjesë.</p>
              </div>
            </div>
            
            
          </div>
        </div>
    </section>

    <section class="e-info-grid" id="faq">
        <div class="container">
          <div class="row">
            
            <div class="col-md-12">
              <h1>Pyetje?</h1>
              <p>Gjeni përgjigje për pyetjet e zakonshme në lidhje me shërbimet tona, terapinë dhe mirëqenien mendore.</p>
              <div class="row">
                <div class="col-md-6 accordian-column">
                    <div class="accordion" id="eAccordion">
                      
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingSix">
                          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix"
                            aria-expanded="false" aria-controls="collapseSix">
                            A duhet të shkarkojnë të ftuarit ndonjë aplikacion për të marrë pjesë?
                          </button>
                        </h2>
                        <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix"
                          data-bs-parent="#myAccordion">
                          <div class="accordion-body">
                              Jo, nuk ka nevojë për aplikacione apo regjistrim të llogarisë.  
                              Ndryshe nga aplikacionet e tjera për ndarjen e fotove, EventetSot nuk kërkon përpjekje të tilla nga të ftuarit tuaj. Ata mund të marrin pjesë lehtësisht duke futur një URL ose duke skanuar QR kodin unik që krijuam për ju. Nga aty, procesi i ngarkimit është shumë i thjeshtë.
                              
                              Është aq e lehtë për t’u përdorur, sa edhe gjyshja mund ta bëjë. Pa shaka.
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingSeven">
                          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                            A mund t’i shkarkoj të gjitha fotot dhe videot e të ftuarve?
                          </button>
                        </h2>
                        <div id="collapseSeven" class="accordion-collapse collapse" aria-labelledby="headingSeven"
                          data-bs-parent="#myAccordion">
                          <div class="accordion-body">
                              Po! Mund të shkarkosh çdo foto apo video individualisht, ose të përdorësh shkarkimin në grup për të marrë të 
                              gjitha skedarët në një dosje të kompresuar (ZIP). Pastaj, je i lirë t’i ruash ku të duash, t’i printosh apo 
                              t’i përdorësh sipas dëshirës. Edhe të ftuarit mund t’i shkarkojnë dhe t’i ndajnë në rrjete sociale me lehtësi (përveç nëse e çaktivizon këtë mundësi).
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingEight">
                          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                            Pse është më mirë se aplikacionet e tjera për ndarjen e fotove?
                          </button>
                        </h2>
                        <div id="collapseEight" class="accordion-collapse collapse" aria-labelledby="headingEight"
                          data-bs-parent="#myAccordion">
                          <div class="accordion-body">
                              Google Photos, Dropbox, grupet në chat, email-et (apo aplikacione të ngjashme) mund të përdoren për të 
                              mbledhur foto nga eventi – nuk ka dyshim. Por procesi i ngarkimit atje shpesh është i ndërlikuar. 
                              Ka shumë hapa, butona, ndonjëherë kërkohet hyrje ose shkarkim aplikacioni. Për më tepër, mundësitë e 
                              personalizimit janë të kufizuara dhe cilësia e fotove ulet. Në përgjithësi, nuk është përvoja më e mirë 
                              për ty dhe për të ftuarit.
  
                              Pikërisht për këtë arsye krijuam EventetSot – për ta thjeshtuar procesin e mbledhjes së fotove dhe 
                              videove nga të ftuarit në evente. E bëmë të lehtë dhe argëtuese, me veçori si slideshow live, hyrje 
                              përmes QR kodi dhe postime të zbukuruara me tekst, për të përmendur vetëm disa.
                              
                              Ndërkohë që këto aplikacione të tjera mund të funksionojnë, ato mund të rezultojnë në një përvojë 
                              të ngadaltë dhe më pak foto. Nëse të pëlqen kjo, pa problem. Por nëse dëshiron përvojën më të mirë 
                              për veten dhe të ftuarit, provo EventetSot.
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingNine">
                          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                            A mund ta printoj QR kodin në tabela ose shenja?
                          </button>
                        </h2>
                        <div id="collapseNine" class="accordion-collapse collapse" aria-labelledby="headingNine"
                          data-bs-parent="#myAccordion">
                          <div class="accordion-body">
                              Po! Shumë organizatorë eventesh e bëjnë këtë. Printoni QR kodin dhe vendoseni në tavolina ose në hyrje 
                              me një shenjë si “Skanoni këtu!”. Të ftuarit mund ta skanojnë kodin dhe të ngarkojnë fotot në albumin 
                              tuaj digjital me lehtësi.
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTen">
                          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen"
                            aria-expanded="false" aria-controls="collapseTen">
                            Eventi im zgjat më shumë se një ditë, a mund ta përdor EventetSot?
                          </button>
                        </h2>
                        <div id="collapseTen" class="accordion-collapse collapse" aria-labelledby="headingTen"
                          data-bs-parent="#myAccordion">
                          <div class="accordion-body">
                              Po! Mbështesim evente që zgjasin disa ditë. Shikoni planet tona dhe zgjidhni atë që përputhet me 
                              kohëzgjatjen e eventit tuaj.
  
                              Muri i Fotove është një slideshow i drejtpërdrejtë që shfaq të gjitha ngarkimet nga të ftuarit – 
                              foto, video dhe postime me tekst. Ai përditësohet në kohë reale me çdo ngarkim të ri. Nuk është i 
                              detyrueshëm për mbledhjen e fotove, por nëse doni më shumë interaktivitet në event, e rekomandojmë shumë!
                              
                              Mund të aksesohet përmes një linku, që do të thotë se mund të shfaqet në çdo pajisje me shfletues 
                              dhe lidhje interneti. Mund ta lidhni me projektorë, TV të zgjuar, tableta etj. përmes kabllove 
                              ose me pajisje si Chromecast apo Apple TV.
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="accordion" id="eAccordion">
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                            aria-expanded="true" aria-controls="collapseOne">
                            A janë private fotot e mia?
                          </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                          data-bs-parent="#myAccordion">
                          <div class="accordion-body">
                              Po, ngarkimet tuaja janë private dhe ndahen vetëm me personat që ju zgjidhni.  
                              Ne nuk i përdorim, nuk i posedojmë dhe nuk ndërveprojmë me fotot tuaja në asnjë mënyrë. Janë vetëm tuajat.
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                            aria-expanded="false" aria-controls="collapseTwo">
                            Ne tashmë kemi fotograf, a duhet ta përdorim gjithsesi?
                          </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                          data-bs-parent="#myAccordion">
                          <div class="accordion-body">
                              Fotografi juaj sigurisht që do të kapë momente të mrekullueshme, por është e pamundur të jetë kudo. Të 
                              ftuarit mund të kapin gjithashtu momente të çmuara që tregojnë anën më autentike të eventit.
  
                              Për më tepër, fotografi mund të ngarkojë fotot që merr gjatë eventit, të cilat do të shfaqen 
                              në Muri i Fotove / albumin digjital. Sa bukur është kjo?
                              
                              Edhe pse EventetSot nuk zëvendëson një fotograf profesionist, shumë çifte e kanë përdorur si një 
                              alternativë më të përballueshme.
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingThree">
                          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree"
                            aria-expanded="false" aria-controls="collapseThree">
                            Po nëse dikush ndan një foto të papërshtatshme?
                          </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                          data-bs-parent="#myAccordion">
                          <div class="accordion-body">
                              Sistemi ynë zbulon automatikisht shumicën e fotove të papërshtatshme. Gjithashtu, ju mund të 
                              fshini çdo foto apo video manualisht nga paneli juaj që mund të aksesohet nga çdo pajisje me llogarinë tuaj.
  
                              Nga përvoja jonë (mbi 50,000 evente), të ftuarit sillen me respekt. Megjithatë, nëse po organizoni 
                              një event publik të madh (si konferencë) dhe shqetësoheni për sjellje të papërshtatshme, mund të 
                              aktivizoni funksionin e moderimit, ku çdo ngarkim duhet të miratohet nga ju (përveç atyre nga njerëz të besuar).
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingFour">
                          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour"
                            aria-expanded="false" aria-controls="collapseFour">
                            A funksionon kjo kudo në botë?
                          </button>
                        </h2>
                        <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour"
                          data-bs-parent="#myAccordion">
                          <div class="accordion-body">
                              Po, platforma jonë funksionon globalisht. Të ftuarit kanë nevojë vetëm për lidhje interneti.
                          </div>
                        </div>
                      </div>
                      
                      
                    </div>
                  </div>
                
                
                
              </div>
            </div>
          </div>
        </div>
    </section>

@endsection
