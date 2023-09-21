import React, { Component } from 'react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

class FantasyMap extends Component {
  constructor(props) {
    super(props);
    this.map = null; // Initialize map as null
    this.initialBounds = [[51.4801, -0.15], [51.5277, -0.00009]];
    this.initialZoom = 14;
    this.polygonCoordinates = null; // Initialize polygon coordinates as null
    this.state = {
      drawingPolygon: false,
      clickedCoordinates: [],
      polygonText: '', // Initialize polygonText
    };
  }

  componentDidMount() {
    // Initialize the map if it's not already initialized
    if (!this.map) {
      // Create a Leaflet image overlay using the image dimensions
      const imageBounds = this.initialBounds; // Replace with your image's bounds

      // Create the map and set its view to a default location

      this.map = L.map('map', { maxZoom: 100 }).setView([51.504, -0.075], 14);

      // Add your image as an overlay
      L.imageOverlay('', imageBounds).addTo(this.map);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
      // Stretch the map container to fit the screen
      this.map.getContainer().style.width = '100vw'; // 100% of viewport width
      this.map.getContainer().style.height = '100vh'; // 100% of viewport height

      const homeButton = L.control({ position: 'topleft' });

      homeButton.onAdd = () => {
        const button = L.DomUtil.create('button', 'custom-home-button');
        button.innerHTML = '<i class="fas fa-home"></i> Home';
        button.onclick = this.handleHomeButtonClick;
        return button;
      };

      homeButton.addTo(this.map);

      // Event listener for map click
      this.map.on('click', this.handleMapClick);

      // Create a layer group for the polygons
      this.polygonLayerGroup = L.layerGroup().addTo(this.map);
      const popupContentAlabaster = `<strong>Alabaster District:</strong><br> To the north, the Alabaster District boasts elegant white-marble buildings, serene gardens, and opulent residences. It's a haven of artistic expression and refined living, offering a stark contrast to the bustling streets below.`;
      // Define popup content for each district

      const popupContentShore = `
<strong>Dockway:</strong><br>
At the foot of the cliffs, The Dockway flourishes as a bustling port area, featuring warehouses, piers, and vibrant marketplaces.
The presence of ships from across Golarion infuses The Dockway with cosmopolitan energy, filling the air with the aroma of saltwater and the symphony of trade.
`;

      const popupContentUnderbridge = `
<strong>Underbridge:</strong><br>
Beneath the colossal Irespan arch lies Underbridge, a gritty and perilous district associated with criminal elements and poverty.
Shrouded in shadows, this area conceals clandestine dealings, beggars, and illicit markets.
`;

      const popupContentLowcleft = `
<strong>Lowcleft:</strong><br>
Below Summit, Lowcleft nestles against the cliffs and accommodates a mixture of middle-class residents, artisans, and scholars.
The Stone of the Seers, a colossal rock formation at the district's heart, holds historical and spiritual significance, alongside libraries, academies, and museums.
`;

      const popupContentBeaconPoint = `
<strong>Beacon's Point:</strong><br>
Along the western cliffs sprawls Beacon's Point, a district adorned with opulent mansions and estates, where the city's elite revel in luxury.
The panoramic vistas from Beacon's Point are unrivaled, making it the envy of all Magnimar.
`;



      const popupContentNaos = `
<strong>Naos:</strong><br>
This district is the spiritual heart of Magnimar, housing numerous temples, shrines, and religious institutions.
Pilgrims and devotees flock to Naos to seek divine guidance and participate in various religious ceremonies.
`;

      const popupContentCapital = `
<strong>Capital District:</strong><br>
Magnimar's governmental hub, the Capital District is where the Council of Ushers convenes to oversee the city's administration.
It is a place of power and governance, where the laws of the city are deliberated and justice is meted out.
`;

      const popupContentKeystone = `
<strong>Keystone District:</strong><br>
Located near the center of the city, Keystone is a thriving commercial and financial district.
Here, merchants, traders, and entrepreneurs conduct their business, and the district serves as a vital economic keystone for Magnimar's prosperity.
`;

      const popupContentOrdellia = `
<strong>Ordellia District:</strong><br>
To the east, the Ordellia District is known for its eclectic mix of cultures and traditions.
Its vibrant streets are lined with exotic markets, restaurants, and shops, reflecting the diverse backgrounds of its inhabitants.
`;
      const polygons = [
        {
          coordinates: [[51.49106875019871, -0.03014271802957103], [51.49168300227223, -0.03065756807288933], [51.49323194901208, -0.0321592140325877], [51.49323194901208, -0.035505739314176665], [51.49323194901208, -0.05395453253322247], [51.493205243479686, -0.05421195755488162], [51.503726012044076, -0.05365420334126682], [51.50523183215366, -0.05701716359931554], [51.50620822363352, -0.05884471402784587], [51.50642180650941, -0.059616989092843305], [51.506261619446356, -0.060088934965885084], [51.50602133779584, -0.059788605773949406], [51.505834451191625, -0.059788605773949406], [51.50567426206366, -0.060174743306438135], [51.505380580533085, -0.06034635998754424], [51.50511359568094, -0.060517976668650345], [51.504766513034454, -0.06043216832809728], [51.504419427744246, -0.06064668917947992], [51.50431263173849, -0.060904114201139066], [51.504072339810335, -0.06141896424445737], [51.50377864795517, -0.06171929343639305], [51.50343155514049, -0.06249156850139049], [51.5028975610325, -0.06296351437443228], [51.5023101602864, -0.06322093939609141], [51.5017494525111, -0.06334965190692099], [51.50100183141245, -0.0628348018636027], [51.50049451011056, -0.06292061020415575], [51.5003610035662, -0.06356417275830362], [51.5002274966307, -0.06382159777996277], [51.5002274966307, -0.06412192697189846], [51.50004058626397, -0.06463677701523675], [51.4994798505645, -0.06498001037744894], [51.499025916611934, -0.06510872288827851], [51.49862538289918, -0.06506581871800199], [51.498304953394666, -0.06476548952606632], [51.49790441334606, -0.06442225616383414], [51.49750386977754, -0.06420773531245151], [51.49710332268905, -0.06425063948272804], [51.49675617903177, -0.06377869360968626], [51.49664936506685, -0.06356417275830362], [51.496328921670234, -0.06339255607719753], [51.495901660303765, -0.06347836441775057], [51.49502042108687, -0.06343546024747404], [51.4946465568781, -0.06364998109885668], [51.494432918810666, -0.06442225616383414], [51.49405904978336, -0.06515162705855505], [51.493498240493004, -0.06515162705855505], [51.49315106937957, -0.06493710620717241], [51.49272377822576, -0.06506581871800199], [51.49240330723208, -0.06480839369634284], [51.492109540175456, -0.06467968118551327], [51.49184247757218, -0.06425063948272804], [51.491602119891596, -0.06412192697189846], [51.49144188073384, -0.06382159777996277], [51.49120152094116, -0.06412192697189846], [51.49098786672826, -0.06420773531245151], [51.490640676496746, -0.06420773531245151], [51.4905872623803, -0.06395031029079236], [51.49015994719585, -0.06407902280162193], [51.48970592042386, -0.06450806450438717], [51.48935872042979, -0.06476548952606632], [51.4899729955432, -0.06605261463436209], [51.490133239863844, -0.06721102723182827], [51.48999970296907, -0.06824072731848485], [51.48970592042386, -0.0687984815320797], [51.489278596978735, -0.0691417148942919], [51.488824561429794, -0.0691417148942919], [51.488637604301324, -0.0689700982131858], [51.48837052135934, -0.06875557736180317], [51.48823697930167, -0.06811201480765527], [51.48818356236908, -0.06746845225350741], [51.48810343685286, -0.06669617718850997], [51.48810343685286, -0.06656746467768039], [51.48775622465541, -0.06605261463436209], [51.48668786284826, -0.06407902280162193], [51.485993414249755, -0.058630193176463244], [51.485966704477065, -0.05378202193519589], [51.485913284884724, -0.04987774243999211], [51.48412369237634, -0.04563022958259611], [51.4842038248862, -0.038250712294973795], [51.48837052135934, -0.03490418701338483], [51.49066738353151, -0.032072511775114165], [51.49109469395989, -0.030184728282927068], [51.4931243637998, -0.03224412845622027]],
          color: 'Red',
          fillOpacity: 0.5,
          popupContent: popupContentNaos
        },
        {
          coordinates: [[51.51336262178232, -0.05382761903017564], [51.513549477508164, -0.053312768986857335], [51.51346939657665, -0.05271211060298599], [51.51322915293743, -0.052283068900220726], [51.51309568370147, -0.05151079383522328], [51.51320245912151, -0.05099594379190498], [51.51325584673767, -0.050481093748586676], [51.5130156019722, -0.0498375311944388], [51.51312237757996, -0.04893654361861178], [51.51333592804459, -0.048335885234740424], [51.51346939657665, -0.047778131021145594], [51.51352278387998, -0.04674843093450898], [51.51424350635088, -0.0460619642100646], [51.51440366535141, -0.04554711416674629], [51.51469728872315, -0.04481774327204535], [51.51501760297008, -0.044388701569280105], [51.51549807011717, -0.04425998905845053], [51.51603191655887, -0.044302893228727054], [51.51645898920736, -0.04460322242066273], [51.5169394411505, -0.044689030761215776], [51.51736650528986, -0.044388701569280105], [51.51795371194322, -0.04417418071789748], [51.51819393066486, -0.04434579739900358], [51.519795356431054, -0.04417418071789748], [51.52048929010928, -0.041599930501285964], [51.520862942325685, -0.04095636794713809], [51.52107645650146, -0.040784751266012], [51.52070280603691, -0.040055380371311074], [51.52062273768136, -0.039712147009098864], [51.52035584214618, -0.03906858445495099], [51.52035584214618, -0.03859663858190921], [51.52030246285144, -0.03833921356025006], [51.52024908349416, -0.03821050104942048], [51.509972391940735, -0.038382117730526584], [51.50682218849316, -0.03700918428165779], [51.501375560274774, -0.03542172998142635], [51.498411680254314, -0.03439202989476975], [51.496542467622724, -0.0337913715108984], [51.493925441153955, -0.033019096445920944], [51.493444746490006, -0.033190713127027045], [51.4933379247652, -0.033190713127027045], [51.493418041082265, -0.05399923571128175], [51.50367176723174, -0.05348438566796344], [51.506475118861175, -0.05884740695256908], [51.5070891633342, -0.059619682017546534], [51.50759641122253, -0.06030614874197095], [51.50818374382769, -0.06052066959335357], [51.508717675989665, -0.06082099878530923], [51.508957943421166, -0.06193650721249889], [51.50941177844584, -0.06270878227747635], [51.50986560894974, -0.06283749478830593], [51.510426216860225, -0.06240845308554067], [51.510559693917365, -0.0624513572558172], [51.50999908764937, -0.061378752998904065], [51.509571954434016, -0.0605635737636301], [51.50834392413328, -0.05893321529312213], [51.50962534630492, -0.05464279826542962], [51.51003840320683, -0.05347861431686641], [51.510478879760875, -0.05266343508161242], [51.512561074911304, -0.05307102469924941], [51.51333520012112, -0.05407927270073777]],
          color: 'Green',
          fillOpacity: 0.5,
          popupContent: popupContentCapital
        },
        {
          coordinates: [[51.52102113696455, -0.04028313119305294], [51.5205941070932, -0.039167622765863275], [51.52054072807774, -0.038309539360332774], [51.520487348999715, -0.03805211433867362], [51.518458897673554, -0.03788049765756751], [51.50997045038294, -0.03805211433867362], [51.50879582366643, -0.037537264295335326], [51.49501839566024, -0.03307523058655671], [51.49389679378509, -0.032388763862132304], [51.49272175269709, -0.03144487211602876], [51.49111937512882, -0.029900321986073848], [51.49165350724287, -0.027240263428909287], [51.49416384435376, -0.022520804698451524], [51.49496498667293, -0.02183433797402712], [51.49635360000539, -0.021748529633474067], [51.4974217353216, -0.021920146314580172], [51.498169415149626, -0.022349188017345423], [51.49929091189479, -0.023121463082322886], [51.50014536708287, -0.023979546487873375], [51.5009464042729, -0.02440858819063863], [51.5016940262808, -0.02578152163948744], [51.50244163602405, -0.027068646747803186], [51.50345622962997, -0.02887062189941725], [51.50436400476132, -0.030157747007732997], [51.50452419849552, -0.03135906377547571], [51.50505817354231, -0.031101638753816555], [51.50580572809548, -0.03127325543492266], [51.50676685164294, -0.030758405391604352], [51.508315285826455, -0.029986130326626895], [51.50970349242482, -0.030243555348286048], [51.510824705337086, -0.0306725970510513], [51.51151877569286, -0.03118744709436961], [51.512052668770984, -0.03118744709436961], [51.51258655559214, -0.03144487211602876], [51.51333398663015, -0.03118744709436961], [51.5141347919907, -0.030930022072710454], [51.51482881191572, -0.029986130326626895], [51.51520251057247, -0.029042238580523353], [51.516270204127046, -0.028613196877758103], [51.51696419151678, -0.02852738853720505], [51.51840551615548, -0.02947128028330859], [51.51931299345407, -0.030500980369945203], [51.520380590655954, -0.030758405391604352], [51.52139478481728, -0.031101638753816555], [51.52278259285871, -0.032217147181026196], [51.52307980841539, -0.0325879652123473], [51.52323993634579, -0.033231527766515175], [51.524174004717466, -0.03473317372619356], [51.52452093951841, -0.035677065472297105], [51.52484118468085, -0.036320628026444986], [51.525508354868784, -0.036921286410316334], [51.526068770272154, -0.03816550734833558], [51.52628226004012, -0.040353620032458355], [51.526175515281274, -0.04095427841632971], [51.52582859308675, -0.04112589509743581], [51.52553504147296, -0.04155493680022105], [51.52518811439855, -0.04228430769492198], [51.52478781064352, -0.04292787024906987], [51.52433412880019, -0.04335691195183511], [51.523666941407384, -0.043099486930175956], [51.52313318445474, -0.04301367858962291], [51.52254604458068, -0.042627541057134184], [51.52235922576045, -0.042198499354368924], [51.52214571759887, -0.04121170343798886], [51.52169200943177, -0.04086847007577666], [51.52137174212167, -0.040439428373011406], [51.52102478332737, -0.040568140883840975], [51.52083795826632, -0.039838769989140044], [51.52057106399245, -0.03915230326471564], [51.52057106399245, -0.0387232615619504]],
          color: 'white',
          fillOpacity: 0.5,
          popupContent: popupContentAlabaster
        },
        {
          coordinates: [[51.497846971254084, -0.06464124659979921], [51.497660051124576, -0.06734420932724028], [51.49763334818635, -0.06854552609500299], [51.497820268425365, -0.0699184595438518], [51.49824751180747, -0.07116268048189102], [51.49822080921343, -0.07240690141991026], [51.498487834449946, -0.07296465563350508], [51.49859464410651, -0.07317917648488771], [51.495283428359706, -0.07892833530200205], [51.495096497717164, -0.08334746484050416], [51.49373455132611, -0.0842913565865877], [51.4934140874381, -0.087337552676241], [51.493307265641455, -0.08789530688985582], [51.48687079051337, -0.0876807860384732], [51.48689749975649, -0.07905704781283164], [51.48772547853279, -0.07133429716299712], [51.488873940330585, -0.06936070533025696], [51.489648468000034, -0.06906037613832129], [51.49010249534414, -0.06845971775444994], [51.490236031937776, -0.06652903009198631], [51.49015591002853, -0.06588546753783843], [51.4898621284899, -0.06545642583507318], [51.48972859080106, -0.06489867162147835], [51.489808713461294, -0.06476995911064877], [51.49034286093112, -0.06434091740786353], [51.49093041591988, -0.06442672574841657], [51.49135772388287, -0.06425510906731048], [51.49170490865371, -0.06451253408896963], [51.492292446088754, -0.0653277133242436], [51.49277315290346, -0.0653277133242436], [51.49322714912969, -0.06528480915396707], [51.49376125654844, -0.0653277133242436], [51.49424194787484, -0.06507028830258445], [51.49477604340364, -0.06369735485371565], [51.49563058323345, -0.06369735485371565], [51.49629818132881, -0.06352573817260955], [51.49691236294083, -0.06434091740786353], [51.49733961483339, -0.06494157579175487], [51.497766862721, -0.06472705494037224]],
          color: 'Cyan',
          fillOpacity: 0.5,
          popupContent: popupContentLowcleft
        },
        {
          coordinates: [[51.48689951142498, -0.08807837688144195], [51.49341609881907, -0.08807837688144195], [51.49357633103762, -0.09116747714137176], [51.495979746731145, -0.0919397522063692], [51.49678085713559, -0.09571531919072343], [51.49672745021333, -0.11476477079364057], [51.4966740432285, -0.11519381249640583], [51.49432407394401, -0.11639512926414855], [51.4933626879544, -0.11785387105357038], [51.49138644196808, -0.11690997930746684], [51.49111937512882, -0.11622351258304242], [51.49101254795503, -0.1097020787009706], [51.48882253572788, -0.10043477792118119], [51.48743369297809, -0.09949088617507765], [51.486846092925475, -0.09631597757459477], [51.486846092925475, -0.09005196871418208]],
          color: 'Purple',
          fillOpacity: 0.5,
          popupContent: popupContentKeystone
        },
        {
          coordinates: [[51.496161305564804, -0.09196872244669588], [51.49698911610956, -0.09540105606885785], [51.49696241277829, -0.11466502852313766], [51.49698911610956, -0.11513697439619944], [51.49987298380783, -0.11479374103396722], [51.50078083031856, -0.11367823260677758], [51.50187556235269, -0.11161883243348439], [51.503878052901825, -0.11003137813325292], [51.5064678101815, -0.1046683568486473], [51.50683033670134, -0.10426184551828978], [51.509126268802476, -0.10070079938531819], [51.51030088699952, -0.10005723683117032], [51.51087483714959, -0.09827671376468451], [51.511435432641285, -0.09827671376468451], [51.51182250645481, -0.09789057623219577], [51.511969326696146, -0.09658199903875177], [51.51139539033495, -0.09565955937779648], [51.51080809913157, -0.09574536771834953], [51.509909431960516, -0.09437366899222478], [51.5095623858451, -0.09433076482194827], [51.509295425495864, -0.09381591477862997], [51.508681410756246, -0.09445947733277783], [51.507586842218714, -0.09415914814084214], [51.507426659251486, -0.0932152563947586], [51.506839316886875, -0.09295783137309944], [51.50630536271262, -0.08986873111316963], [51.5064655496219, -0.08866741434540694], [51.506145175240164, -0.08879612685623652], [51.505931591067586, -0.0855354099152006], [51.5056112129315, -0.0848489431907762], [51.50483695646937, -0.08510636821243535], [51.504650065007475, -0.0860502599585189], [51.50432967786088, -0.08630768498017805], [51.50392919075984, -0.08613606829907197], [51.503715596200074, -0.08544960157464755], [51.50347530112362, -0.0850205598718823], [51.50302140696649, -0.08446280565828748], [51.502861207949266, -0.08429118897718137], [51.502567508288365, -0.08356181808246045], [51.50240730767549, -0.08334729723107782], [51.5019534028807, -0.08540669740437103], [51.50157959553738, -0.08665091834239026], [51.501152383390526, -0.08768061842904684], [51.49669311756048, -0.08789513928042947], [51.49655959988051, -0.09137037707284802], [51.49623915585282, -0.09175651460533675]],
          color: 'Yellow',
          fillOpacity: 0.5,
          popupContent: popupContentBeaconPoint
        },
        {
          coordinates: [[[51.515765936983186, -0.05764535270335048], [51.51592609063082, -0.05640113176533125], [51.516139627951745, -0.05511400665703549], [51.51584601387741, -0.054127210740655414], [51.515712552308834, -0.05271137312153008], [51.5157926292969, -0.051510056353767375], [51.51627308826894, -0.050651972948236874], [51.516326472286316, -0.04970808120215332], [51.516593391434746, -0.04751996851803054], [51.51691369234816, -0.04679059762332961], [51.517901272651905, -0.04451667659865378], [51.51726068246256, -0.04494571830141903], [51.51680692562731, -0.045160239152801665], [51.5164332401334, -0.044902814131142506], [51.51595278285069, -0.04451667659865378], [51.51525878005071, -0.04443086825810073], [51.51477831037958, -0.045117334982525126], [51.514538073643514, -0.045932514217779115], [51.5142177560245, -0.04657607677194698], [51.51379066236199, -0.04691931013415919], [51.51365719477125, -0.04743416017747749], [51.51347033948725, -0.04833514775328453], [51.51323009585299, -0.0491503269885385], [51.5132567896527, -0.0498367937129829], [51.51339025841661, -0.0505232604374073], [51.513336870957964, -0.05116682299155518], [51.51341695212245, -0.05202490639708568], [51.51371058185448, -0.052453948099870924], [51.51373727537262, -0.05314041482429533], [51.51360380762545, -0.05361236069733711], [51.51349703314617, -0.05395559405954931], [51.51427114245075, -0.05494238997590939], [51.51432452881444, -0.055242719167865065], [51.51499185308132, -0.05498529414618593], [51.51531216525688, -0.05550014418952421], [51.51544562799857, -0.05708759848975565], [51.515712552308834, -0.05747373602224438], [51.51573924465384, -0.05657274844643734]], [[51.502309147796176, -0.08322466335528357], [51.50132122944436, -0.08687151782880821], [51.50116102445036, -0.08730055953157347], [51.496781869870865, -0.08747217621269955], [51.496541538233274, -0.08468340514470542], [51.496034167281394, -0.08343918420666618], [51.495366565319216, -0.08296723833362442], [51.495366565319216, -0.07910586300871715], [51.49857096556495, -0.07297056665911407], [51.49833064336078, -0.07236990827524271], [51.49838404840455, -0.07121149567777653], [51.49774318374938, -0.06868014963144153], [51.49801021178415, -0.06477587013625775], [51.4988913931993, -0.06546233686068215], [51.49966575068195, -0.06546233686068215], [51.5001997826596, -0.06473296596598123], [51.50041339369853, -0.06378907421987769], [51.50062700373628, -0.06331712834683591], [51.5015081345589, -0.06374617004960115], [51.50286984868509, -0.06348874502794201], [51.50348394174301, -0.06280227830351759], [51.50420482303431, -0.06142934485464879], [51.50481889810231, -0.06078578230050092], [51.505806740630234, -0.06031383642745914], [51.50636739848423, -0.060270932257182615], [51.50692804943965, -0.06151515319520185], [51.508529871299736, -0.06203000323854014], [51.509037103148785, -0.06305970332517674], [51.51007824556801, -0.06280227830351759], [51.51093249850093, -0.0629738949846237], [51.511386313856434, -0.06366036170904811], [51.511573177688824, -0.06524781600929953], [51.512187153455834, -0.06546233686068215], [51.51237401400332, -0.06511910349846996], [51.51261426215245, -0.06554814520123521], [51.51426927052881, -0.06799368290701714], [51.51333499899763, -0.06807949124757019], [51.51269434458724, -0.0676075453745284], [51.512400708304696, -0.06786497039618755], [51.51213376458719, -0.06855143712061197], [51.51149309328308, -0.069452424696419], [51.51133292404925, -0.07005308308029036], [51.51098588877741, -0.07061083729390516], [51.51047867862476, -0.07091116648584085], [51.51007824556801, -0.07039631644252255], [51.50983798404458, -0.07039631644252255], [51.50957102531025, -0.07056793312362865], [51.50927736889574, -0.07056793312362865], [51.50893031796564, -0.0715118248697122], [51.50877013972164, -0.07271314163745492], [51.50866335391277, -0.07374284172411151], [51.50839638829562, -0.0755877210460021], [51.50767557331574, -0.07567352938655515], [51.50735520744199, -0.0749012543215777], [51.50674116655437, -0.07378574589438802], [51.50682125931335, -0.07249862078607229], [51.50674116655437, -0.07129730401832958], [51.5070882341598, -0.07035341227222604], [51.506794561742645, -0.06816529958812324], [51.50463200656634, -0.06799368290701714], [51.50375093614357, -0.06936661635586594], [51.50273634909919, -0.06863724546116502], [51.501614937137354, -0.07061083729390516], [51.501614937137354, -0.07164053738054178], [51.50108092174215, -0.07314218334022017], [51.50185524202368, -0.08077912564950164], [51.502522748948266, -0.08142268820364952], [51.502576149079886, -0.08270981331196527]]],
          color: 'Pink',
          fillOpacity: 0.5,
          popupContent: popupContentShore
        },
        {
          coordinates: [[51.50329547736419, -0.13982976775237968], [51.50206727789339, -0.14257563465009726], [51.49907674076621, -0.14283305967175644], [51.49539170194592, -0.13948653439016745], [51.49485761363067, -0.13468126731917665], [51.49261437437094, -0.1321928254431182], [51.49138588704597, -0.128417258458744], [51.491279060496694, -0.12395522474996537], [51.49213366588194, -0.12309714134441486], [51.493255311137915, -0.12464169147438978], [51.49357577614212, -0.1258430082421325], [51.49507124970772, -0.12652947496657685], [51.49592578400337, -0.1266152833071299], [51.49640645250468, -0.1238694164094123], [51.495445110433266, -0.12326875802554095], [51.49475079521669, -0.12206744125777826], [51.49523147610843, -0.1204370827872703], [51.49576556004319, -0.11880672431674234], [51.496513267038814, -0.1192357660195076], [51.49662008132266, -0.11546019903515337], [51.49720755540955, -0.11563181571625948], [51.49720755540955, -0.11932157436006065], [51.49763480453508, -0.1188925326572954], [51.498969932239426, -0.1192357660195076], [51.49950397237032, -0.12035127444669726], [51.49998460313789, -0.12189582457667215], [51.50014481226737, -0.12309714134441486], [51.49966418318936, -0.12361199138775315], [51.499023336534115, -0.12395522474996537], [51.49854269562923, -0.12438426645273062], [51.497474586582335, -0.12438426645273062], [51.49720755540955, -0.12404103309051841], [51.496833709139445, -0.12687270832878905], [51.50051863137936, -0.13030504195093107], [51.50153326779872, -0.1320212087620121], [51.50228088017918, -0.13459545897860362], [51.50340227575381, -0.13854264264408392]],
          color: 'Orange',
          fillOpacity: 0.5,
          popupContent: popupContentOrdellia
        },

        {
          coordinates: [[51.5155549076628, -0.10246197107142586], [51.515768446723825, -0.10199002519838408], [51.516208867875584, -0.101410818899641], [51.51646244175847, -0.10119629804825836], [51.51648913366402, -0.10070290009006834], [51.51692954784733, -0.10081016051576965], [51.51735661207943, -0.10098177719687576], [51.51782370899833, -0.10177550434700146], [51.518771233747486, -0.10166824392130014], [51.51879792430003, -0.10246197107142586], [51.519198280711215, -0.10398506911625251], [51.51991891338267, -0.10329860239182809], [51.52023919090988, -0.10329860239182809], [51.520252535757955, -0.1026764919228085], [51.52010574221394, -0.10188276477268278], [51.51991891338267, -0.10149662724019407], [51.519745428781654, -0.10168969600644842], [51.519465183030185, -0.10104613345228054], [51.51962532367077, -0.10016659796162175], [51.51994560326264, -0.09952303540745389], [51.519465183030185, -0.09887947285330602], [51.51933173206621, -0.09746363523418068], [51.51963866869872, -0.09626231846641797], [51.51975877377441, -0.09486793293242092], [51.52011908710113, -0.09405275369716694], [51.52070625826633, -0.09385968493091258], [51.52160034527279, -0.09478212459186787], [51.521907266615884, -0.09407420578229521], [51.521947299682054, -0.09351645156870038], [51.521386833553215, -0.09147850348055545], [51.52120000997744, -0.09044880339391882], [51.52083970520262, -0.0897194324991979], [51.520559466184736, -0.08783164900703079], [51.52079967116276, -0.0867375926649694], [51.52079967116276, -0.08562208423775977], [51.520559466184736, -0.08487126125793057], [51.52039932882887, -0.08422769870376269], [51.52042601842727, -0.08369139657531613], [51.52027922544241, -0.08296202568059519], [51.5203459495851, -0.0827904089994891], [51.51851767271817, -0.08233991521159557], [51.516796089453585, -0.08326235487255086], [51.51548817650094, -0.08491416542820708], [51.51452723693004, -0.08705937394203335], [51.51398002617125, -0.08931184288158092], [51.51363301106448, -0.09156431182110847], [51.513486196185056, -0.09458905582563348], [51.51391329270218, -0.09812864987345683], [51.51467404845423, -0.10081016051576965], [51.515514868977405, -0.10261213566738371]],
          color: 'Black',
          fillOpacity: 0.5,
          popupContent: popupContentUnderbridge
        },

        // Add more polygons here with their respective coordinates, colors, and popup content
      ];

      polygons.forEach((polygon, index) => {
        const polygonLayer = L.polygon(polygon.coordinates, {
          color: polygon.color,
          fillOpacity: .1,
        }).bindPopup(polygon.popupContent);

        // Add the polygon to the layer group with a name
        this.polygonLayerGroup.addLayer(polygonLayer);
      });

      // Create a layer control menu to toggle the polygon layer on and off
      const layerControl = L.control.layers(null, { 'Districts': this.polygonLayerGroup }).addTo(this.map);
    }
  }


  handleHomeButtonClick = () => {
    // Reset the map's bounds to the initial view
    this.map.setView([51.504, -0.075], this.initialZoom);
  };

  startDrawingPolygon = () => {
    // Clear any existing clicked coordinates and polygonText
    this.setState({ clickedCoordinates: [], polygonText: '', drawingPolygon: true });
  };

  finishDrawingPolygon = () => {
    this.setState({ drawingPolygon: false });

    // Update the polygonText state with the polygon coordinates
    this.setState({ polygonText: JSON.stringify(this.state.clickedCoordinates) });
  };

  handleMapClick = (e) => {
    const { drawingPolygon } = this.state;
    const { latlng } = e;

    // If in polygon drawing mode, add the clicked coordinate to the array
    if (drawingPolygon) {
      this.setState((prevState) => ({
        clickedCoordinates: [...prevState.clickedCoordinates, [latlng.lat, latlng.lng]],
      }));
    }
  };

  componentWillUnmount() {
    // Cleanup and destroy the map when the component is unmounted
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  render() {
    const { clickedCoordinates } = this.state;

    // Check if there are clicked coordinates to render
    const coordinatesToRender = clickedCoordinates.map((coord, index) => (
      <div key={index} className="popup">
        <strong>Clicked Coordinate {index + 1}:</strong>
        <br />
        Latitude: {coord[0].toFixed(6)}
        <br />
        Longitude: {coord[1].toFixed(6)}
      </div>
    ));

    return (
      <div className="map-container">
        <div id="map"></div>
        <div className="coordinates-container">{coordinatesToRender}</div>
        <button onClick={this.startDrawingPolygon}>Start Drawing Polygon</button>
        <button onClick={this.finishDrawingPolygon}>Finish Drawing Polygon</button>
        <div className="polygon-text">
          {this.state.polygonText && (
            <pre>{`this.polygonCoordinates = ${this.state.polygonText};`}</pre>
          )}
        </div>
      </div>
    );
  }
}

export default FantasyMap;