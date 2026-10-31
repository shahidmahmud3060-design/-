export interface DistrictInfo {
  id: string;
  nameBn: string;
  nameEn: string;
  upazilas: {
    id: string;
    nameBn: string;
    nameEn: string;
    unions?: string[];
  }[];
}

export interface DivisionInfo {
  id: string;
  nameBn: string;
  nameEn: string;
  districts: DistrictInfo[];
}

export const BANGLADESH_DIVISIONS: DivisionInfo[] = [
  {
    id: 'dhaka',
    nameBn: 'ঢাকা',
    nameEn: 'Dhaka',
    districts: [
      {
        id: 'dhaka',
        nameBn: 'ঢাকা',
        nameEn: 'Dhaka',
        upazilas: [
          { id: 'mirpur', nameBn: 'মিরপুর', nameEn: 'Mirpur', unions: ['ওয়ার্ড ০১', 'ওয়ার্ড ০২', 'ওয়ার্ড ০৩', 'মিরপুর পল্লী'] },
          { id: 'dhanmondi', nameBn: 'ধানমন্ডি', nameEn: 'Dhanmondi', unions: ['ওয়ার্ড ১৫', 'ওয়ার্ড ১৬', 'শঙ্কর'] },
          { id: 'gulshan', nameBn: 'গুলশান', nameEn: 'Gulshan', unions: ['ওয়ার্ড ১৯', 'ওয়ার্ড ২০', 'বনানী'] },
          { id: 'uttara', nameBn: 'উত্তরা', nameEn: 'Uttara', unions: ['সেক্টর ০১-০৭', 'সেক্টর ০৮-১৪', 'তুরাগ'] },
          { id: 'savar', nameBn: 'সাভার', nameEn: 'Savar', unions: ['আমিনবাজার', 'বিরুলিয়া', 'তেঁতুলঝোড়া', 'ধামসোনা'] },
          { id: 'keraniganj', nameBn: 'কেরানীগঞ্জ', nameEn: 'Keraniganj', unions: ['জিনজিরা', 'রোহিতপুর', 'বাস্তা', 'শুভাঢ্যা'] },
          { id: 'dhamrai', nameBn: 'ধামরাই', nameEn: 'Dhamrai', unions: ['সুয়াপুর', 'আমতা', 'গাংগুটিয়া'] },
          { id: 'jatrabari', nameBn: 'যাত্রাবাড়ী', nameEn: 'Jatrabari', unions: ['ওয়ার্ড ৪৮', 'ওয়ার্ড ৪৯', 'মাতুয়াইল'] },
          { id: 'mohammadpur', nameBn: 'মোহাম্মদপুর', nameEn: 'Mohammadpur', unions: ['ওয়ার্ড ২৯', 'ওয়ার্ড ৩৩', 'বসিলা'] },
        ]
      },
      {
        id: 'gazipur',
        nameBn: 'গাজীপুর',
        nameEn: 'Gazipur',
        upazilas: [
          { id: 'gazipur_sadar', nameBn: 'গাজীপুর সদর', nameEn: 'Gazipur Sadar', unions: ['কোনাবাড়ী', 'কাউসিলা', 'মির্জাপুর'] },
          { id: 'kaliakair', nameBn: 'কালিয়াকৈর', nameEn: 'Kaliakair', unions: ['বোয়ালী', 'ফুলবাড়িয়া', 'চাপাইর'] },
          { id: 'kapasia', nameBn: 'কাপাসিয়া', nameEn: 'Kapasia', unions: ['টোক', 'বারিসাব', 'ঘাগটিয়া'] },
          { id: 'sreepur', nameBn: 'শ্রীপুর', nameEn: 'Sreepur', unions: ['মাওনা', 'তেলিহাটি', 'গোসিংগা'] },
          { id: 'kaliganj', nameBn: 'কালীগঞ্জ', nameEn: 'Kaliganj', unions: ['তুমুলিয়া', 'বক্তারপুর', 'নাগরী'] },
        ]
      },
      {
        id: 'narayanganj',
        nameBn: 'নারায়ণগঞ্জ',
        nameEn: 'Narayanganj',
        upazilas: [
          { id: 'narayanganj_sadar', nameBn: 'নারায়ণগঞ্জ সদর', nameEn: 'Narayanganj Sadar', unions: ['ফতুল্লা', 'সিদ্ধিরগঞ্জ', 'এনায়েতনগর'] },
          { id: 'bandar', nameBn: 'বন্দর', nameEn: 'Bandar', unions: ['কলাগাছিয়া', 'মুছাপুর', 'মদনপুর'] },
          { id: 'rupganj', nameBn: 'রূপগঞ্জ', nameEn: 'Rupganj', unions: ['মুড়াপাড়া', 'ভুলতা', 'কাঞ্চন'] },
          { id: 'sonargaon', nameBn: 'সোনারগাঁও', nameEn: 'Sonargaon', unions: ['বারদী', 'বৈদ্যেরবাজার', 'জামপুর'] },
          { id: 'araihazar', nameBn: 'আড়াইহাজার', nameEn: 'Araihazar', unions: ['হাইমচর', 'ফতেহপুর', 'মাহমুদপুর'] },
        ]
      },
      {
        id: 'tangail',
        nameBn: 'টাঙ্গাইল',
        nameEn: 'Tangail',
        upazilas: [
          { id: 'tangail_sadar', nameBn: 'টাঙ্গাইল সদর', nameEn: 'Tangail Sadar', unions: ['মগড়া', 'পোড়াবাড়ী', 'বাঘিল'] },
          { id: 'ghatail', nameBn: 'ঘাটাইল', nameEn: 'Ghatail', unions: ['দেওপাড়া', 'লোকমানপুর', 'দিঘলকান্দি'] },
          { id: 'kalihati', nameBn: 'কালিহাতী', nameEn: 'Kalihati', unions: ['এলেঙ্গা', 'নারান্দিয়া', 'সহদেবপুর'] },
          { id: 'madhupur', nameBn: 'মধুপুর', nameEn: 'Madhupur', unions: ['অরণখোলা', 'কুড়ালিয়া', 'মহিষমারা'] },
          { id: 'mirzapur', nameBn: 'মির্জাপুর', nameEn: 'Mirzapur', unions: ['গোড়াই', 'মহেরা', 'ওয়ার্শী'] },
          { id: 'sakhipur', nameBn: 'সখিপুর', nameEn: 'Sakhipur', unions: ['কালিদাস', 'বহুরিয়া', 'কাকড়াজান'] },
        ]
      },
      {
        id: 'faridpur',
        nameBn: 'ফরিদপুর',
        nameEn: 'Faridpur',
        upazilas: [
          { id: 'faridpur_sadar', nameBn: 'ফরিদপুর সদর', nameEn: 'Faridpur Sadar', unions: ['ঈশান গোপালপুর', 'কানাইপুর', 'মাচ্চর'] },
          { id: 'bhanga', nameBn: 'ভাঙ্গা', nameEn: 'Bhanga', unions: ['আলগী', 'হামিরদী', 'কালামৃধা'] },
          { id: 'boalmari', nameBn: 'বোয়ালমারী', nameEn: 'Boalmari', unions: ['গুণবহা', 'সাতৈর', 'চতুল'] },
          { id: 'alfadanga', nameBn: 'আলফাডাঙ্গা', nameEn: 'Alfadanga', unions: ['টগরবন্দ', 'বুড়াইচ', 'গোপালপুর'] },
        ]
      },
      {
        id: 'manikganj',
        nameBn: 'মানিকগঞ্জ',
        nameEn: 'Manikganj',
        upazilas: [
          { id: 'manikganj_sadar', nameBn: 'মানিকগঞ্জ সদর', nameEn: 'Manikganj Sadar', unions: ['বেউথা', 'জাগীর', 'নবগ্রাম'] },
          { id: 'singair', nameBn: 'সিংগাইর', nameEn: 'Singair', unions: ['ধল্লা', 'সায়েস্তা', 'বায়রা'] },
          { id: 'shibalaya', nameBn: 'শিবালয়', nameEn: 'Shibalaya', unions: ['উলাইল', 'তেউতা', 'শিমুলিয়া'] },
        ]
      },
      {
        id: 'munshiganj',
        nameBn: 'মুন্সীগঞ্জ',
        nameEn: 'Munshiganj',
        upazilas: [
          { id: 'munshiganj_sadar', nameBn: 'মুন্সীগঞ্জ সদর', nameEn: 'Munshiganj Sadar', unions: ['পঞ্চসার', 'রামপাল', 'মোল্লাকান্দি'] },
          { id: 'sirajdikhan', nameBn: 'সিরাজদিখান', nameEn: 'Sirajdikhan', unions: ['মালখানগর', 'ইছাপুরা', 'রশুনিয়া'] },
          { id: 'sreenagar', nameBn: 'শ্রীনগর', nameEn: 'Sreenagar', unions: ['হাঁসাড়া', 'শ্যামসিদ্ধি', 'বীরতারা'] },
        ]
      },
      {
        id: 'narsingdi',
        nameBn: 'নরসিংদী',
        nameEn: 'Narsingdi',
        upazilas: [
          { id: 'narsingdi_sadar', nameBn: 'নরসিংদী সদর', nameEn: 'Narsingdi Sadar', unions: ['পাঁচদোনা', 'মেহেরপাড়া', 'আমদিয়া'] },
          { id: 'shibpur', nameBn: 'শিবপুর', nameEn: 'Shibpur', unions: ['বাঘাব', 'আয়ুবপুর', 'মাছিমপুর'] },
          { id: 'palash', nameBn: 'পলাশ', nameEn: 'Palash', unions: ['ঘোড়াশাল', 'ডাঙ্গা', 'চরসিন্দুর'] },
          { id: 'raipura', nameBn: 'রায়পুরা', nameEn: 'Raipura', unions: ['মরজাল', 'পান্তাখালী', 'আমিরগঞ্জ'] },
        ]
      },
      {
        id: 'gopalganj',
        nameBn: 'গোপালগঞ্জ',
        nameEn: 'Gopalganj',
        upazilas: [
          { id: 'gopalganj_sadar', nameBn: 'গোপালগঞ্জ সদর', nameEn: 'Gopalganj Sadar', unions: ['বোড়াশী', 'হরিদাসপুর', 'করপাড়া'] },
          { id: 'kashiani', nameBn: 'কাশিয়ানী', nameEn: 'Kashiani', unions: ['মহেশপুর', 'ওড়াকান্দি', 'সিংগা'] },
          { id: 'kotalipara', nameBn: 'কোটালীপাড়া', nameEn: 'Kotalipara', unions: ['কুশলা', 'বান্ধাবাড়ী', 'রাধাগঞ্জ'] },
          { id: 'muksudpur', nameBn: 'মুকসুদপুর', nameEn: 'Muksudpur', unions: ['বাটিকামারী', 'উজানী', 'গোহালা'] },
          { id: 'tungipara', nameBn: 'টুঙ্গিপাড়া', nameEn: 'Tungipara', unions: ['গোপালপুর', 'কুশলী', 'ডুমুরিয়া'] },
        ]
      },
      {
        id: 'madaripur',
        nameBn: 'মাদারীপুর',
        nameEn: 'Madaripur',
        upazilas: [
          { id: 'madaripur_sadar', nameBn: 'মাদারীপুর সদর', nameEn: 'Madaripur Sadar', unions: ['মস্তফাপুর', 'শিরখাড়া', 'পাঁচখোলা'] },
          { id: 'kalkini', nameBn: 'কালকিনি', nameEn: 'Kalkini', unions: ['এনায়েতনগর', 'আলীনগর', 'লক্ষ্মীপুর'] },
          { id: 'shibchar', nameBn: 'শিবচর', nameEn: 'Shibchar', unions: ['দত্তপাড়া', 'চরজানাজাত', 'উমেদপুর'] },
          { id: 'rajoir', nameBn: 'রাজৈর', nameEn: 'Rajoir', unions: ['ইশিবপুর', 'কদমবাড়ী', 'আমগ্রাম'] },
        ]
      },
      {
        id: 'rajbari',
        nameBn: 'রাজবাড়ী',
        nameEn: 'Rajbari',
        upazilas: [
          { id: 'rajbari_sadar', nameBn: 'রাজবাড়ী সদর', nameEn: 'Rajbari Sadar', unions: ['বসন্তপুর', 'বানীবহ', 'খানখানাপুর'] },
          { id: 'pangsha', nameBn: 'পাংশা', nameEn: 'Pangsha', unions: ['বাহাদুরপুর', 'হাবাসপুর', 'যশাই'] },
          { id: 'goalanda', nameBn: 'গোয়ালন্দ', nameEn: 'Goalanda', unions: ['দৌলতদিয়া', 'উজানচর', 'ছোটভাকলা'] },
          { id: 'baliakandi', nameBn: 'বালিয়াকান্দি', nameEn: 'Baliakandi', unions: ['বহরপুর', 'জামালপুর', 'ইসলামপুর'] },
        ]
      },
      {
        id: 'shariatpur',
        nameBn: 'শরীয়তপুর',
        nameEn: 'Shariatpur',
        upazilas: [
          { id: 'shariatpur_sadar', nameBn: 'শরীয়তপুর সদর', nameEn: 'Shariatpur Sadar', unions: ['পালং', 'আংগারিয়া', 'চন্দ্রপুর'] },
          { id: 'naria', nameBn: 'নড়িয়া', nameEn: 'Naria', unions: ['জপসা', 'কেদারপুর', 'ঘড়িসার'] },
          { id: 'zajira', nameBn: 'জাজিরা', nameEn: 'Zajira', unions: ['বিলাসপুর', 'বড়কান্দি', 'পদ্মা'] },
          { id: 'bhedarganj', nameBn: 'ভেদরগঞ্জ', nameEn: 'Bhedarganj', unions: ['রামভদ্রপুর', 'চরভাগা', 'মহিষার'] },
        ]
      },
      {
        id: 'kishoreganj',
        nameBn: 'কিশোরগঞ্জ',
        nameEn: 'Kishoreganj',
        upazilas: [
          { id: 'kishoreganj_sadar', nameBn: 'কিশোরগঞ্জ সদর', nameEn: 'Kishoreganj Sadar', unions: ['যশোদল', 'বিন্নাটি', 'মাইজখাপন'] },
          { id: 'bajitpur', nameBn: 'বাজিতপুর', nameEn: 'Bajitpur', unions: ['হিলচিয়া', 'সরারচর', 'পিরিজপুর'] },
          { id: 'bhairab', nameBn: 'ভৈরব', nameEn: 'Bhairab', unions: ['শিমুলকান্দি', 'শ্রীনগর', 'সাদেকপুর'] },
          { id: 'karimganj', nameBn: 'করিমগঞ্জ', nameEn: 'Karimganj', unions: ['কাদিরজঙ্গল', 'জাফরাবাদ', 'দেহুন্দা'] },
          { id: 'kuliarchar', nameBn: 'কুলিয়ারচর', nameEn: 'Kuliarchar', unions: ['রামদী', 'গোবরিয়া', 'ছয়সূতী'] },
        ]
      }
    ]
  },
  {
    id: 'chittagong',
    nameBn: 'চট্টগ্রাম',
    nameEn: 'Chittagong',
    districts: [
      {
        id: 'chittagong',
        nameBn: 'চট্টগ্রাম',
        nameEn: 'Chittagong',
        upazilas: [
          { id: 'kotwali_ctg', nameBn: 'কোতোয়ালী', nameEn: 'Kotwali', unions: ['আন্দরকিল্লা', 'ফিরিঙ্গিবাজার', 'পাথরঘাটা'] },
          { id: 'panchlaish', nameBn: 'পাঁচলাইশ', nameEn: 'Panchlaish', unions: ['মুরাদপুর', 'ষোলশহর', 'চকবাজার'] },
          { id: 'hathazari', nameBn: 'হাটহাজারী', nameEn: 'Hathazari', unions: ['ফতেপুর', 'মেখল', 'মির্জাপুর', 'গুমানমর্দ্দন'] },
          { id: 'fatikchhari', nameBn: 'ফটিকছড়ি', nameEn: 'Fatikchhari', unions: ['নাজিরহাট', 'রোসাংগিরি', 'সুয়াবিল'] },
          { id: 'patiya', nameBn: 'পটিয়া', nameEn: 'Patiya', unions: ['কুসুমপুরা', 'কোলাগাঁও', 'হাইডগাঁও'] },
          { id: 'sitakunda', nameBn: 'সীতাকুণ্ড', nameEn: 'Sitakunda', unions: ['বারবকুন্ড', 'কুমিরা', 'বাঁশবাড়িয়া'] },
          { id: 'mirsharai', nameBn: 'মীরসরাই', nameEn: 'Mirsharai', unions: ['বারইয়ারহাট', 'করারহাট', 'ওয়াহেদপুর'] },
          { id: 'chandanpura', nameBn: 'চন্দনাইশ', nameEn: 'Chandanpura', unions: ['দোহাজারী', 'কাঞ্চনাবাদ', 'জোয়ারা'] },
          { id: 'banshkali', nameBn: 'বাঁশখালী', nameEn: 'Banshkali', unions: ['কালীপুর', 'বৈলছড়ি', 'খানখানাবাদ'] },
        ]
      },
      {
        id: 'coxsbazar',
        nameBn: 'কক্সবাজার',
        nameEn: "Cox's Bazar",
        upazilas: [
          { id: 'coxsbazar_sadar', nameBn: 'কক্সবাজার সদর', nameEn: "Cox's Bazar Sadar", unions: ['ঝিলংজা', 'পিএমখালী', 'খুরুশকুল'] },
          { id: 'chakaria', nameBn: 'চকোরিয়া', nameEn: 'Chakaria', unions: ['কৈয়ারবিল', 'বরইতলী', 'হারবাং'] },
          { id: 'teknaf', nameBn: 'টেকনাফ', nameEn: 'Teknaf', unions: ['সেন্টমার্টিন', 'হ্নীলা', 'বাহারছড়া'] },
          { id: 'ramu', nameBn: 'রামু', nameEn: 'Ramu', unions: ['ফতেখাঁরকুল', 'ঈদগড়', 'কাউয়ারখোপ'] },
          { id: 'ukhiya', nameBn: 'উখিয়া', nameEn: 'Ukhiya', unions: ['জালিয়াপালং', 'রত্নাপালং', 'হলদিয়াপালং'] },
        ]
      },
      {
        id: 'comilla',
        nameBn: 'কুমিল্লা',
        nameEn: 'Cumilla',
        upazilas: [
          { id: 'comilla_sadar', nameBn: 'কুমিল্লা আদর্শ সদর', nameEn: 'Cumilla Adarsha Sadar', unions: ['কালিরবাজার', 'দুর্গাপুর', 'জগন্নাথপুর'] },
          { id: 'daudkandi', nameBn: 'দাউদকান্দি', nameEn: 'Daudkandi', unions: ['গৌরীপুর', 'ইলিয়টগঞ্জ', 'মারুকা'] },
          { id: 'debidwar', nameBn: 'দেবিদ্বার', nameEn: 'Debidwar', unions: ['বরকামতা', 'রসুলপুর', 'গুনাইঘর'] },
          { id: 'chandina', nameBn: 'চান্দিনা', nameEn: 'Chandina', unions: ['মাইজখার', 'কেরণখাল', 'এতবারপুর'] },
          { id: 'burichang', nameBn: 'বুড়িচং', nameEn: 'Burichang', unions: ['ময়নামতি', 'রাজাপুর', 'বাকশীমূল'] },
          { id: 'brahmanpara', nameBn: 'ব্রাহ্মণপাড়া', nameEn: 'Brahmanpara', unions: ['মাধবপুর', 'সাহেবাবাদ', 'শশীদল'] },
        ]
      },
      {
        id: 'feni',
        nameBn: 'ফেনী',
        nameEn: 'Feni',
        upazilas: [
          { id: 'feni_sadar', nameBn: 'ফেনী সদর', nameEn: 'Feni Sadar', unions: ['ধর্মপুর', 'ফাজিলপুর', 'কালীদহ'] },
          { id: 'daganbhuiyan', nameBn: 'দাগনভূঞা', nameEn: 'Daganbhuiyan', unions: ['মাতুভূঞা', 'রাজাপুর', 'সিন্দুরপুর'] },
          { id: 'sonagazi', nameBn: 'সোনাগাজী', nameEn: 'Sonagazi', unions: ['চরচান্দিয়া', 'মঙ্গলকান্দি', 'মতিগঞ্জ'] },
          { id: 'parshuram', nameBn: 'পরশুরাম', nameEn: 'Parshuram', unions: ['চিথলিয়া', 'বক্সমাহমুদ', 'মির্জানগর'] },
        ]
      },
      {
        id: 'brahmanbaria',
        nameBn: 'ব্রাহ্মণবাড়িয়া',
        nameEn: 'Brahmanbaria',
        upazilas: [
          { id: 'brahmanbaria_sadar', nameBn: 'ব্রাহ্মণবাড়িয়া সদর', nameEn: 'Brahmanbaria Sadar', unions: ['মাঝিশ গাছা', 'রামরাইল', 'সুহিলপুর'] },
          { id: 'kasba', nameBn: 'কসবা', nameEn: 'Kasba', unions: ['খাড়েরা', 'কুটি', 'কায়েমপুর'] },
          { id: 'nabinagar', nameBn: 'নবীনগর', nameEn: 'Nabinagar', unions: ['কাইতলা', 'শিবপুর', 'বিটঘর'] },
          { id: 'sarail', nameBn: 'সরাইল', nameEn: 'Sarail', unions: ['অরুয়াইল', 'কালীকচ্ছ', 'শাহবাজপুর'] },
          { id: 'ashuganj', nameBn: 'আশুগঞ্জ', nameEn: 'Ashuganj', unions: ['চরচারতলা', 'তালশহর', 'আড়াইসিধা'] },
        ]
      },
      {
        id: 'noakhali',
        nameBn: 'নোয়াখালী',
        nameEn: 'Noakhali',
        upazilas: [
          { id: 'noakhali_sadar', nameBn: 'নোয়াখালী সদর', nameEn: 'Noakhali Sadar', unions: ['কালাদরপ', 'দাদপুর', 'নোয়ান্নই'] },
          { id: 'begumganj', nameBn: 'বেগমগঞ্জ', nameEn: 'Begumganj', unions: ['চৌমুহনী', 'একলাশপুর', 'রাজগঞ্জ'] },
          { id: 'senbagh', nameBn: 'সেনবাগ', nameEn: 'Senbagh', unions: ['ডুমুরুয়া', 'ছাতারপাইয়া', 'কেশবপুর'] },
          { id: 'companyganj', nameBn: 'কোম্পানীগঞ্জ', nameEn: 'Companyganj', unions: ['বসুরহাট', 'মুছাপুর', 'চরএলাহী'] },
        ]
      },
      {
        id: 'chandpur',
        nameBn: 'চাঁদপুর',
        nameEn: 'Chandpur',
        upazilas: [
          { id: 'chandpur_sadar', nameBn: 'চাঁদপুর সদর', nameEn: 'Chandpur Sadar', unions: ['বিষ্ণুপুর', 'আশিকাটি', 'মৈশাদী'] },
          { id: 'hajiganj', nameBn: 'হাজীগঞ্জ', nameEn: 'Hajiganj', unions: ['কালচোঁ', 'বড়কুল', 'হাটিলা'] },
          { id: 'faridganj', nameBn: 'ফরিদগঞ্জ', nameEn: 'Faridganj', unions: ['বালিথুবা', 'সুবিদপুর', 'গুপ্টি'] },
          { id: 'matlab_dakshin', nameBn: 'মতলব দক্ষিণ', nameEn: 'Matlab Dakshin', unions: ['নায়েরগাঁও', 'খাদেরগাঁও', 'উপাদী'] },
        ]
      },
      {
        id: 'lakshmipur',
        nameBn: 'লক্ষ্মীপুর',
        nameEn: 'Lakshmipur',
        upazilas: [
          { id: 'lakshmipur_sadar', nameBn: 'লক্ষ্মীপুর সদর', nameEn: 'Lakshmipur Sadar', unions: ['উত্তর হামছাদী', 'দালাল বাজার', 'বশিকপুর'] },
          { id: 'raipur', nameBn: 'রায়পুর', nameEn: 'Raipur', unions: ['উত্তর চরবংশী', 'চরমোহনা', 'সোনাপুর'] },
          { id: 'ramganj', nameBn: 'রামগঞ্জ', nameEn: 'Ramganj', unions: ['কাঞ্চনপুর', 'নোয়াগাঁও', 'ভাটরা'] },
        ]
      },
      {
        id: 'rangamati',
        nameBn: 'রাঙ্গামাটি',
        nameEn: 'Rangamati',
        upazilas: [
          { id: 'rangamati_sadar', nameBn: 'রাঙ্গামাটি সদর', nameEn: 'Rangamati Sadar', unions: ['কুতুকছড়ি', 'সাপছড়ি', 'মগবান'] },
          { id: 'kaptai', nameBn: 'কাপ্তাই', nameEn: 'Kaptai', unions: ['চন্দ্রঘোনা', 'কাপ্তাই ইউনিয়ন', 'রাইখালী'] },
        ]
      },
      {
        id: 'bandarban',
        nameBn: 'বান্দরবান',
        nameEn: 'Bandarban',
        upazilas: [
          { id: 'bandarban_sadar', nameBn: 'বান্দরবান সদর', nameEn: 'Bandarban Sadar', unions: ['রাজবিলা', 'কুহালং', 'সুয়ালক'] },
          { id: 'lama', nameBn: 'লামা', nameEn: 'Lama', unions: ['গজালিয়া', 'লামা সদর', 'ফাঁসিয়াখালী'] },
        ]
      },
      {
        id: 'khagrachhari',
        nameBn: 'খাগড়াছড়ি',
        nameEn: 'Khagrachhari',
        upazilas: [
          { id: 'khagrachhari_sadar', nameBn: 'খাগড়াছড়ি সদর', nameEn: 'Khagrachhari Sadar', unions: ['পেরাছড়া', 'গোলাবাড়ী', 'কমলছড়ি'] },
          { id: 'ramgarh', nameBn: 'রামগড়', nameEn: 'Ramgarh', unions: ['রামগড় সদর', 'পাতাছড়া'] },
        ]
      }
    ]
  },
  {
    id: 'sylhet',
    nameBn: 'সিলেট',
    nameEn: 'Sylhet',
    districts: [
      {
        id: 'sylhet',
        nameBn: 'সিলেট',
        nameEn: 'Sylhet',
        upazilas: [
          { id: 'sylhet_sadar', nameBn: 'সিলেট সদর', nameEn: 'Sylhet Sadar', unions: ['জালালাবাদ', 'খাদিমনগর', 'টুকPointXYZ'] },
          { id: 'golapganj', nameBn: 'গোলাপগঞ্জ', nameEn: 'Golapganj', unions: ['বাঘা', 'ফুলবাড়ী', 'লক্ষ্মীপাশা'] },
          { id: 'beanibazar', nameBn: 'বিয়ানীবাজার', nameEn: 'Beanibazar', unions: ['আলীনগর', 'চারখাই', 'দুবাক'] },
          { id: 'bishwanath', nameBn: 'বিশ্বনাথ', nameEn: 'Bishwanath', unions: ['লামাকাজী', 'খাজাঞ্চী', 'দেওকলস'] },
          { id: 'osmaninagar', nameBn: 'ওসমানীনগর', nameEn: 'Osmaninagar', unions: ['উমরপুর', 'তাজপুর', 'গোয়ালাবাজার'] },
        ]
      },
      {
        id: 'moulvibazar',
        nameBn: 'মৌলভীবাজার',
        nameEn: 'Moulvibazar',
        upazilas: [
          { id: 'moulvibazar_sadar', nameBn: 'মৌলভীবাজার সদর', nameEn: 'Moulvibazar Sadar', unions: ['আমতৈল', 'খলিলপুর', 'চাঁদনীঘাট'] },
          { id: 'sreemangal', nameBn: 'শ্রীমঙ্গল', nameEn: 'Sreemangal', unions: ['কালাপুর', 'সিন্দুরখান', 'আশীকান্দা'] },
          { id: 'kulaura', nameBn: 'কুলাউড়া', nameEn: 'Kulaura', unions: ['ভাটেরা', 'ব্রাহ্মণবাজার', 'টিলাগাঁও'] },
        ]
      },
      {
        id: 'habiganj',
        nameBn: 'হবিগঞ্জ',
        nameEn: 'Habiganj',
        upazilas: [
          { id: 'habiganj_sadar', nameBn: 'হবিগঞ্জ সদর', nameEn: 'Habiganj Sadar', unions: ['লুকড়া', 'রিচি', 'তেঘোরিয়া'] },
          { id: 'madhabpur', nameBn: 'মাধবপুর', nameEn: 'Madhabpur', unions: ['ধর্মঘর', 'চৌমুহনী', 'আন্দিউড়া'] },
          { id: 'nabiganj', nameBn: 'নবীগঞ্জ', nameEn: 'Nabiganj', unions: ['বাউসা', 'ইনাতগঞ্জ', 'কুর্শি'] },
        ]
      },
      {
        id: 'sunamganj',
        nameBn: 'সুনামগঞ্জ',
        nameEn: 'Sunamganj',
        upazilas: [
          { id: 'sunamganj_sadar', nameBn: 'সুনামগঞ্জ সদর', nameEn: 'Sunamganj Sadar', unions: ['জাহাঙ্গীরনগর', 'সুরমা', 'রঙ্গারচর'] },
          { id: 'chhatak', nameBn: 'ছাতক', nameEn: 'Chhatak', unions: ['কালারুকা', 'ইসলামপুর', 'নোয়ারাই'] },
          { id: 'derai', nameBn: 'দিরাই', nameEn: 'Derai', unions: ['করিমপুর', 'জগদল', 'কুলঞ্জ'] },
        ]
      }
    ]
  },
  {
    id: 'rajshahi',
    nameBn: 'রাজশাহী',
    nameEn: 'Rajshahi',
    districts: [
      {
        id: 'rajshahi',
        nameBn: 'রাজশাহী',
        nameEn: 'Rajshahi',
        upazilas: [
          { id: 'boalia', nameBn: 'বোয়ালিয়া', nameEn: 'Boalia', unions: ['ওয়ার্ড ১১', 'ওয়ার্ড ১২', 'রামচন্দ্রপুর'] },
          { id: 'godagari', nameBn: 'গোদাগাড়ী', nameEn: 'Godagari', unions: ['মাটিকাটা', 'মোহনপুর', 'চর আষাড়িয়াদহ'] },
          { id: 'paba', nameBn: 'পবা', nameEn: 'Paba', unions: ['হড়গ্রাম', 'দামকুড়া', 'পারসিলা'] },
          { id: 'bagha', nameBn: 'বাঘা', nameEn: 'Bagha', unions: ['বাজুবাঘা', 'গড়গড়ী', 'পাকুড়িয়া'] },
        ]
      },
      {
        id: 'bogra',
        nameBn: 'বগুড়া',
        nameEn: 'Bogura',
        upazilas: [
          { id: 'bogra_sadar', nameBn: 'বগুড়া সদর', nameEn: 'Bogura Sadar', unions: ['নিশিন্দারা', 'ফাঁপোর', 'সাবগ্রাম'] },
          { id: 'sherpur_bogra', nameBn: 'শেরপুর', nameEn: 'Sherpur', unions: ['কুসুম্বী', 'খানপুর', 'মির্জাপুর'] },
          { id: 'shibganj_bogra', nameBn: 'শিবগঞ্জ', nameEn: 'Shibganj', unions: ['মহাস্থান', 'দেউলী', 'বিহার'] },
          { id: 'gabtali', nameBn: 'গাবতলী', nameEn: 'Gabtali', unions: ['কাগইল', 'রামেশ্বরপুর', 'বালিয়াদীঘি'] },
        ]
      },
      {
        id: 'pabna',
        nameBn: 'পাবনা',
        nameEn: 'Pabna',
        upazilas: [
          { id: 'pabna_sadar', nameBn: 'পাবনা সদর', nameEn: 'Pabna Sadar', unions: ['দোগাছী', 'হেমায়েতপুর', 'মালঞ্চি'] },
          { id: 'ishwardi', nameBn: 'ঈশ্বরদী', nameEn: 'Ishwardi', unions: ['সাহাপুর', 'সলিমপুর', 'দাশুরিয়া'] },
          { id: 'santhia', nameBn: 'সাঁথিয়া', nameEn: 'Santhia', unions: ['ধোপাদহ', 'করমজা', 'ক্ষেতুপাড়া'] },
        ]
      },
      {
        id: 'sirajganj',
        nameBn: 'সিরাজগঞ্জ',
        nameEn: 'Sirajganj',
        upazilas: [
          { id: 'sirajganj_sadar', nameBn: 'সিরাজগঞ্জ সদর', nameEn: 'Sirajganj Sadar', unions: ['বাগবাটি', 'কালিয়া হরিপুর', 'রতনকান্দি'] },
          { id: 'shahjadpur', nameBn: 'শাহজাদপুর', nameEn: 'Shahjadpur', unions: ['পোতাজিয়া', 'কায়েমপুর', 'গালা'] },
          { id: 'ullapara', nameBn: 'উল্লাপাড়া', nameEn: 'Ullapara', unions: ['পূর্ণিমাগাঁতী', 'সলপ', 'বাঙ্গালা'] },
        ]
      },
      {
        id: 'natore',
        nameBn: 'নাটোর',
        nameEn: 'Natore',
        upazilas: [
          { id: 'natore_sadar', nameBn: 'নাটোর সদর', nameEn: 'Natore Sadar', unions: ['ছাতনী', 'তেবাড়িয়া', 'দিঘাপতিয়া'] },
          { id: 'singra', nameBn: 'সিংড়া', nameEn: 'Singra', unions: ['চৌগ্রাম', 'কলম', 'ইটালী'] },
          { id: 'baraigram', nameBn: 'বড়াইগ্রাম', nameEn: 'Baraigram', unions: ['জোয়ারী', 'নগর', 'গোপালপুর'] },
        ]
      },
      {
        id: 'naogaon',
        nameBn: 'নওগাঁ',
        nameEn: 'Naogaon',
        upazilas: [
          { id: 'naogaon_sadar', nameBn: 'নওগাঁ সদর', nameEn: 'Naogaon Sadar', unions: ['বোয়ালিয়া', 'দুবলহাটি', 'বর্ষাইল'] },
          { id: 'patnitala', nameBn: 'পত্নীতলা', nameEn: 'Patnitala', unions: ['মাতিন্দর', 'পত্নীতলা', 'নির্মইল'] },
          { id: 'manda', nameBn: 'মান্দা', nameEn: 'Manda', unions: ['প্রসাদপুর', 'ভালাইন', 'কুসুম্বা'] },
        ]
      },
      {
        id: 'chapainawabganj',
        nameBn: 'চাঁপাইনবাবগঞ্জ',
        nameEn: 'Chapainawabganj',
        upazilas: [
          { id: 'chapainawabganj_sadar', nameBn: 'চাঁপাইনবাবগঞ্জ সদর', nameEn: 'Chapainawabganj Sadar', unions: ['বালিয়াডাঙ্গা', 'ঝিকরগাছা', 'রানীনগর'] },
          { id: 'shibganj_cn', nameBn: 'শিবগঞ্জ', nameEn: 'Shibganj', unions: ['চককীর্তি', 'ধাইনগর', 'শাহবাজপুর'] },
        ]
      },
      {
        id: 'joypurhat',
        nameBn: 'জয়পুরহাট',
        nameEn: 'Joypurhat',
        upazilas: [
          { id: 'joypurhat_sadar', nameBn: 'জয়পুরহাট সদর', nameEn: 'Joypurhat Sadar', unions: ['মোহাম্মদাবাদ', 'দোগাছী', 'ভাদসা'] },
          { id: 'panchbibi', nameBn: 'পাঁচবিবি', nameEn: 'Panchbibi', unions: ['বালিঘাটা', 'বাগজানা', 'আয়মারসুলপুর'] },
        ]
      }
    ]
  },
  {
    id: 'khulna',
    nameBn: 'খুলনা',
    nameEn: 'Khulna',
    districts: [
      {
        id: 'khulna',
        nameBn: 'খুলনা',
        nameEn: 'Khulna',
        upazilas: [
          { id: 'khulna_sadar', nameBn: 'খুলনা সদর', nameEn: 'Khulna Sadar', unions: ['ওয়ার্ড ২২', 'ওয়ার্ড ২৪', 'টুটপাড়া'] },
          { id: 'dumuria', nameBn: 'ডুমুরিয়া', nameEn: 'Dumuria', unions: ['ধামালিয়া', 'রুদাঘরা', 'মাগুরাঘোনা'] },
          { id: 'paikgachha', nameBn: 'পাইকগাছা', nameEn: 'Paikgachha', unions: ['কপিলমুনি', 'গড়ইখালী', 'রাড়ুলী'] },
          { id: 'dighalia', nameBn: 'দিঘলিয়া', nameEn: 'Dighalia', unions: ['গাজীরহাট', 'বারাকপুর', 'সেনহাটি'] },
        ]
      },
      {
        id: 'satkhira',
        nameBn: 'সাতক্ষীরা',
        nameEn: 'Satkhira',
        upazilas: [
          { id: 'satkhira_sadar', nameBn: 'সাতক্ষীরা সদর', nameEn: 'Satkhira Sadar', unions: ['ব্রহ্মরাজপুর', 'লাবসা', 'ধলবাড়ীয়া'] },
          { id: 'kaliganj_sat', nameBn: 'কালীগঞ্জ', nameEn: 'Kaliganj', unions: ['বিষ্ণুপুর', 'কৃষ্ণনগর', 'চাম্পাফুল'] },
          { id: 'shyamnagar', nameBn: 'শ্যামনগর', nameEn: 'Shyamnagar', unions: ['বুড়িগোয়ালিনী', 'মুন্সীগঞ্জ', 'গাবুরা'] },
          { id: 'kalaroa', nameBn: 'কলারোয়া', nameEn: 'Kalaroa', unions: ['জয়নগর', 'জালালাবাদ', 'কেরালকাতা'] },
        ]
      },
      {
        id: 'jashore',
        nameBn: 'যশোর',
        nameEn: 'Jashore',
        upazilas: [
          { id: 'jashore_sadar', nameBn: 'যশোর সদর', nameEn: 'Jashore Sadar', unions: ['হৈবতপুর', 'লেবুতলা', 'ফতেপুর'] },
          { id: 'jhikargachha', nameBn: 'ঝিকরগাছা', nameEn: 'Jhikargachha', unions: ['গঙ্গানন্দপুর', 'মাগুরা', 'শংকরপুর'] },
          { id: 'manirampur', nameBn: 'মণিরামপুর', nameEn: 'Manirampur', unions: ['রোহিতা', 'কাশীমনগর', 'ভোজগাতী'] },
        ]
      },
      {
        id: 'bagerhat',
        nameBn: 'বাগেরহাট',
        nameEn: 'Bagerhat',
        upazilas: [
          { id: 'bagerhat_sadar', nameBn: 'বাগেরহাট সদর', nameEn: 'Bagerhat Sadar', unions: ['কাড়াপাড়া', 'ষাটগম্বুজ', 'যাত্রাপুর'] },
          { id: 'mongla', nameBn: 'মোংলা', nameEn: 'Mongla', unions: ['বুড়িরডাঙ্গা', 'চিলা', 'চাঁদপাই'] },
          { id: 'morrelganj', nameBn: 'মোরেলগঞ্জ', nameEn: 'Morrelganj', unions: ['তেলিগাতী', 'হোগলাপাশা', 'নিশানবাড়িয়া'] },
        ]
      },
      {
        id: 'kushtia',
        nameBn: 'কুষ্টিয়া',
        nameEn: 'Kushtia',
        upazilas: [
          { id: 'kushtia_sadar', nameBn: 'কুষ্টিয়া সদর', nameEn: 'Kushtia Sadar', unions: ['হরিনারায়নপুর', 'আলামপুর', 'ঝাউদিয়া'] },
          { id: 'kumarkhali', nameBn: 'কুমারখালী', nameEn: 'Kumarkhali', unions: ['শিলাইদহ', 'সাঁওতা', 'জগন্নাথপুর'] },
          { id: 'bheramara', nameBn: 'ভেড়ামারা', nameEn: 'Bheramara', unions: ['বাহাদুরপুর', 'মোকাররমপুর', 'চাঁদগ্রাম'] },
        ]
      },
      {
        id: 'chuadanga',
        nameBn: 'চুয়াডাঙ্গা',
        nameEn: 'Chuadanga',
        upazilas: [
          { id: 'chuadanga_sadar', nameBn: 'চুয়াডাঙ্গা সদর', nameEn: 'Chuadanga Sadar', unions: ['আলুকদিয়া', 'মোমিনপুর', 'তিতুদহ'] },
          { id: 'alamdanga', nameBn: 'আলমডাঙ্গা', nameEn: 'Alamdanga', unions: ['ভাংবাড়ীয়া', 'হারদী', 'কুমারী'] },
          { id: 'damurhuda', nameBn: 'দামুড়হুদা', nameEn: 'Damurhuda', unions: ['কার্পাসডাঙ্গা', 'জুড়ালপুর', 'কুড়ালগাছি'] },
        ]
      },
      {
        id: 'jhenaidah',
        nameBn: 'ঝিনাইদহ',
        nameEn: 'Jhenaidah',
        upazilas: [
          { id: 'jhenaidah_sadar', nameBn: 'ঝিনাইদহ সদর', nameEn: 'Jhenaidah Sadar', unions: ['সাধুহাটি', 'মধূহাটি', 'হরিণাকুন্ডু সীমান্ত'] },
          { id: 'kaliganj_jhe', nameBn: 'কালীগঞ্জ', nameEn: 'Kaliganj', unions: ['সুন্দরপুর', 'বারবাজার', 'কোলা'] },
          { id: 'kotchandpur', nameBn: 'কোটচাঁদপুর', nameEn: 'Kotchandpur', unions: ['সাফদারপুর', 'দোড়া', 'কুশনা'] },
        ]
      },
      {
        id: 'magura',
        nameBn: 'মাগুরা',
        nameEn: 'Magura',
        upazilas: [
          { id: 'magura_sadar', nameBn: 'মাগুরা সদর', nameEn: 'Magura Sadar', unions: ['কুচিয়ামোড়া', 'চাউলিয়া', 'বগিয়া'] },
          { id: 'sreepur_mag', nameBn: 'শ্রীপুর', nameEn: 'Sreepur', unions: ['গয়েশপুর', 'শ্রীকোল', 'আমলসার'] },
        ]
      },
      {
        id: 'meherpur',
        nameBn: 'মেহেরপুর',
        nameEn: 'Meherpur',
        upazilas: [
          { id: 'meherpur_sadar', nameBn: 'মেহেরপুর সদর', nameEn: 'Meherpur Sadar', unions: ['কুতুবপুর', 'আমদহ', 'বুড়িপোতা'] },
          { id: 'gangni', nameBn: 'গাংনী', nameEn: 'Gangni', unions: ['বামন্দী', 'তেঁতুলবাড়ীয়া', 'কাথুলী'] },
        ]
      },
      {
        id: 'narail',
        nameBn: 'নড়াইল',
        nameEn: 'Narail',
        upazilas: [
          { id: 'narail_sadar', nameBn: 'নড়াইল সদর', nameEn: 'Narail Sadar', unions: ['মাইজপাড়া', 'হবখালী', 'শাহাবাদ'] },
          { id: 'lohagagara', nameBn: 'লোহাগড়া', nameEn: 'Lohagara', unions: ['নলদী', 'লাহুড়িয়া', 'কাশীপুর'] },
        ]
      }
    ]
  },
  {
    id: 'barishal',
    nameBn: 'বরিশাল',
    nameEn: 'Barishal',
    districts: [
      {
        id: 'barishal',
        nameBn: 'বরিশাল',
        nameEn: 'Barishal',
        upazilas: [
          { id: 'barishal_sadar', nameBn: 'বরিশাল সদর', nameEn: 'Barishal Sadar', unions: ['রায়পাশা কড়াপুর', 'চরকাউয়া', 'চাঁদপুরা'] },
          { id: 'bakerganj', nameBn: 'বাকেরগঞ্জ', nameEn: 'Bakerganj', unions: ['দুধল', 'চরামদ্দী', 'গারুড়িয়া'] },
          { id: 'babuganj', nameBn: 'বাবুগঞ্জ', nameEn: 'Babuganj', unions: ['জাহাঙ্গীরনগর', 'রহমতপুর', 'মাধবপাশা'] },
          { id: 'wazirpur', nameBn: 'উজিরপুর', nameEn: 'Wazirpur', unions: ['গুঠিয়া', 'শোলক', 'বরাকোঠা'] },
        ]
      },
      {
        id: 'bhola',
        nameBn: 'ভোলা',
        nameEn: 'Bhola',
        upazilas: [
          { id: 'bhola_sadar', nameBn: 'ভোলা সদর', nameEn: 'Bhola Sadar', unions: ['ইলিশা', 'ভেলুমিয়া', 'শিবপুর'] },
          { id: 'charfasson', nameBn: 'চরফ্যাশন', nameEn: 'Charfasson', unions: ['দুলারহাট', 'শশীভূষণ', 'চরমানিকা'] },
          { id: 'lalmohan', nameBn: 'লালমোহন', nameEn: 'Lalmohan', unions: ['ধলী গৌরনগর', 'কালমা', 'বুলবুলিয়া'] },
        ]
      },
      {
        id: 'patuakhali',
        nameBn: 'পটুয়াখালী',
        nameEn: 'Patuakhali',
        upazilas: [
          { id: 'patuakhali_sadar', nameBn: 'পটুয়াখালী সদর', nameEn: 'Patuakhali Sadar', unions: ['মাদারবুনিয়া', 'ছোটবিঘাই', 'বদরপুর'] },
          { id: 'kalapara', nameBn: 'কলাপাড়া', nameEn: 'Kalapara', unions: ['কুয়াকাটা', 'মহিপুর', 'লতাচাপলী'] },
          { id: 'galachipa', nameBn: 'গলাচিপা', nameEn: 'Galachipa', unions: ['ডাকুয়া', 'রতনদী তালতলী', 'গলাচিপা'] },
        ]
      },
      {
        id: 'pirojpur',
        nameBn: 'পিরোজপুর',
        nameEn: 'Pirojpur',
        upazilas: [
          { id: 'pirojpur_sadar', nameBn: 'পিরোজপুর সদর', nameEn: 'Pirojpur Sadar', unions: ['কদমতলা', 'দূর্গাপুর', 'শিকদারমল্লিক'] },
          { id: 'mathbaria', nameBn: 'মঠবাড়িয়া', nameEn: 'Mathbaria', unions: ['তুষখালী', 'মিরুখালী', 'বড়মাছুয়া'] },
          { id: 'nesarabad', nameBn: 'স্বরূপকাঠি (নেছারাবাদ)', nameEn: 'Nesarabad', unions: ['স্বরূপকাঠি', 'সুটিয়াকাঠি', 'বলদিয়া'] },
        ]
      },
      {
        id: 'barguna',
        nameBn: 'বরগুনা',
        nameEn: 'Barguna',
        upazilas: [
          { id: 'barguna_sadar', nameBn: 'বরগুনা সদর', nameEn: 'Barguna Sadar', unions: ['বদরখালী', 'গৌরীচন্না', 'আয়লা পাতাকাটা'] },
          { id: 'amtali', nameBn: 'আমতলী', nameEn: 'Amtali', unions: ['গুলিশাখালী', 'কুকুয়া', 'আঠারগাছিয়া'] },
          { id: 'patharghata', nameBn: 'পাথরঘাটা', nameEn: 'Patharghata', unions: ['কালমেঘা', 'কাকচিড়া', 'রায়হানপুর'] },
        ]
      },
      {
        id: 'jhalokathi',
        nameBn: 'ঝালকাঠি',
        nameEn: 'Jhalokathi',
        upazilas: [
          { id: 'jhalokathi_sadar', nameBn: 'ঝালকাঠি সদর', nameEn: 'Jhalokathi Sadar', unions: ['নবগ্রাম', 'গাভা রামচন্দ্রপুর', 'কীর্তিপাশা'] },
          { id: 'nalchity', nameBn: 'নলছিটি', nameEn: 'Nalchity', unions: ['দপদপিয়া', 'কুলকাঠি', 'কুশঙ্গল'] },
          { id: 'rajapur', nameBn: 'রাজাপুর', nameEn: 'Rajapur', unions: ['সাতুরিয়া', 'শুক্তাগড়', 'মঠবাড়ী'] },
        ]
      }
    ]
  },
  {
    id: 'rangpur',
    nameBn: 'রংপুর',
    nameEn: 'Rangpur',
    districts: [
      {
        id: 'rangpur',
        nameBn: 'রংপুর',
        nameEn: 'Rangpur',
        upazilas: [
          { id: 'rangpur_sadar', nameBn: 'রংপুর সদর', nameEn: 'Rangpur Sadar', unions: ['মমিনপুর', 'হরিদেবপুর', 'উত্তম'] },
          { id: 'pirganj', nameBn: 'পীরগঞ্জ', nameEn: 'Pirganj', unions: ['চতরা', 'রায়পুর', 'বড়দরগাহ'] },
          { id: 'badarganj', nameBn: 'বদরগঞ্জ', nameEn: 'Badarganj', unions: ['গোপালপুর', 'রাধাকৃষ্ণপুর', 'দামোদরপুর'] },
          { id: 'mithapukur', nameBn: 'মিঠাপুকুর', nameEn: 'Mithapukur', unions: ['পায়রাবন্দ', 'বালুয়া মাসিমপুর', 'কাফ্রিখাল'] },
        ]
      },
      {
        id: 'dinajpur',
        nameBn: 'দিনাজপুর',
        nameEn: 'Dinajpur',
        upazilas: [
          { id: 'dinajpur_sadar', nameBn: 'দিনাজপুর সদর', nameEn: 'Dinajpur Sadar', unions: ['চেহেলগাজী', 'সুন্দরবন', 'ফাযিলপুর'] },
          { id: 'birganj', nameBn: 'বীরগঞ্জ', nameEn: 'Birganj', unions: ['শিবরামপুর', 'পলাশবাড়ী', 'শতগ্রাম'] },
          { id: 'fulbari', nameBn: 'ফুলবাড়ী', nameEn: 'Fulbari', unions: ['এলুয়ারী', 'আলাদিপুর', 'বেতদিঘী'] },
        ]
      },
      {
        id: 'gaibandha',
        nameBn: 'গাইবান্ধা',
        nameEn: 'Gaibandha',
        upazilas: [
          { id: 'gaibandha_sadar', nameBn: 'গাইবান্ধা সদর', nameEn: 'Gaibandha Sadar', unions: ['বোয়ালী', 'ঘাগোয়া', 'কোপারপাড়া'] },
          { id: 'gobindaganj', nameBn: 'গোবিন্দগঞ্জ', nameEn: 'Gobindaganj', unions: ['কামারদহ', 'মহিমাগঞ্জ', 'কোচাশহর'] },
          { id: 'palashbari', nameBn: 'পলাশবাড়ী', nameEn: 'Palashbari', unions: ['কিশোরগাড়ী', 'হোসেনপুর', 'বেতকাপা'] },
        ]
      },
      {
        id: 'kurigram',
        nameBn: 'কুড়িগ্রাম',
        nameEn: 'Kurigram',
        upazilas: [
          { id: 'kurigram_sadar', nameBn: 'কুড়িগ্রাম সদর', nameEn: 'Kurigram Sadar', unions: ['হোগলডাঙ্গা', 'যাত্রাপুর', 'পাঁচগাছী'] },
          { id: 'ulipur', nameBn: 'উলিপুর', nameEn: 'Ulipur', unions: ['হাতিয়া', 'দলদলিয়া', 'দুর্গাপুর'] },
          { id: 'nageshwari', nameBn: 'নাগেশ্বরী', nameEn: 'Nageshwari', unions: ['রায়গঞ্জ', 'বামনডাঙ্গা', 'কালীগঞ্জ'] },
        ]
      },
      {
        id: 'nilphamari',
        nameBn: 'নীলফামারী',
        nameEn: 'Nilphamari',
        upazilas: [
          { id: 'nilphamari_sadar', nameBn: 'নীলফামারী সদর', nameEn: 'Nilphamari Sadar', unions: ['চওড়া বড়গাছা', 'সোনারায়', 'ইটাখোলা'] },
          { id: 'saidpur', nameBn: 'সৈয়দপুর', nameEn: 'Saidpur', unions: ['বোতলাগাড়ী', 'বাঙালীপুর', 'কামারপুকুর'] },
          { id: 'domar', nameBn: 'ডোমার', nameEn: 'Domar', unions: ['বোড়াগাড়ী', 'কেতকীবাড়ী', 'জোড়াবাড়ী'] },
        ]
      },
      {
        id: 'thakurgaon',
        nameBn: 'ঠাকুরগাঁও',
        nameEn: 'Thakurgaon',
        upazilas: [
          { id: 'thakurgaon_sadar', nameBn: 'ঠাকুরগাঁও সদর', nameEn: 'Thakurgaon Sadar', unions: ['রুহিয়া', 'আউলিয়াপুর', 'চিলারং'] },
          { id: 'pirganj_thak', nameBn: 'পীরগঞ্জ', nameEn: 'Pirganj', unions: ['ভোমরাদহ', 'কোষারাণীগঞ্জ', 'বৈরচুনা'] },
        ]
      },
      {
        id: 'panchagarh',
        nameBn: 'পঞ্চগড়',
        nameEn: 'Panchagarh',
        upazilas: [
          { id: 'panchagarh_sadar', nameBn: 'পঞ্চগড় সদর', nameEn: 'Panchagarh Sadar', unions: ['হাঁড়িভাসা', 'চাকলাহাট', 'মাগুরা'] },
          { id: 'tetulia', nameBn: 'তেঁতুলিয়া', nameEn: 'Tetulia', unions: ['বাংলাবান্ধা', 'তিরনইহাট', 'শালবাহান'] },
        ]
      },
      {
        id: 'lalmonirhat',
        nameBn: 'লালমনিরহাট',
        nameEn: 'Lalmonirhat',
        upazilas: [
          { id: 'lalmonirhat_sadar', nameBn: 'লালমনিরহাট সদর', nameEn: 'Lalmonirhat Sadar', unions: ['মোগলহাট', 'কুলাঘাট', 'মহেন্দ্রনগর'] },
          { id: 'patgram', nameBn: 'পাটগ্রাম', nameEn: 'Patgram', unions: ['বুড়িমারী', 'কুচলীবাড়ী', 'দহগ্রাম'] },
        ]
      }
    ]
  },
  {
    id: 'mymensingh',
    nameBn: 'ময়মনসিংহ',
    nameEn: 'Mymensingh',
    districts: [
      {
        id: 'mymensingh',
        nameBn: 'ময়মনসিংহ',
        nameEn: 'Mymensingh',
        upazilas: [
          { id: 'mymensingh_sadar', nameBn: 'ময়মনসিংহ সদর', nameEn: 'Mymensingh Sadar', unions: ['চর ঈশ্বরদিয়া', 'ভাবখালী', 'সিরতা'] },
          { id: 'muktagacha', nameBn: 'মুক্তাগাছা', nameEn: 'Muktagacha', unions: ['তারাটি', 'ঘোগা', 'দাশকীয়া'] },
          { id: 'trishal', nameBn: 'ত্রিশাল', nameEn: 'Trishal', unions: ['কানিহারী', 'বৈলর', 'আমিরাবাড়ী'] },
          { id: 'fulbaria', nameBn: 'ফুলবাড়ীয়া', nameEn: 'Fulbaria', unions: ['বাকতা', 'রাঙ্গামাটিয়া', 'এনায়েতপুর'] },
          { id: 'gafargaon', nameBn: 'গফরগাঁও', nameEn: 'Gafargaon', unions: ['রসুলপুর', 'চরআলগী', 'পাঁচবাগ'] },
          { id: 'ishwarganj', nameBn: 'ঈশ্বরগঞ্জ', nameEn: 'Ishwarganj', unions: ['জাটিয়া', 'সরিষাবাড়ী', 'উচাখিলা'] },
        ]
      },
      {
        id: 'jamalpur',
        nameBn: 'জামালপুর',
        nameEn: 'Jamalpur',
        upazilas: [
          { id: 'jamalpur_sadar', nameBn: 'জামালপুর সদর', nameEn: 'Jamalpur Sadar', unions: ['কেন্দুয়া', 'শরীফপুর', 'শাহবাজপুর'] },
          { id: 'sarishabari', nameBn: 'সরিষাবাড়ী', nameEn: 'Sarishabari', unions: ['পিংনা', 'পোগলদিঘা', 'ভাটারা'] },
          { id: 'melandaha', nameBn: 'মেলান্দহ', nameEn: 'Melandaha', unions: ['কুলিয়া', 'নয়ানগর', 'দুরমুঠ'] },
          { id: 'dewanganj', nameBn: 'দেওয়ানগঞ্জ', nameEn: 'Dewanganj', unions: ['বাহাদুরাবাদ', 'চিকাজানী', 'তারাটিয়া'] },
        ]
      },
      {
        id: 'netrokona',
        nameBn: 'নেত্রকোণা',
        nameEn: 'Netrokona',
        upazilas: [
          { id: 'netrokona_sadar', nameBn: 'নেত্রকোণা সদর', nameEn: 'Netrokona Sadar', unions: ['মৌগাতি', 'মেদনী', 'ঠাকুরাকোনা'] },
          { id: 'kendua', nameBn: 'কেন্দুয়া', nameEn: 'Kendua', unions: ['চিরাং', 'কান্দিয়া', 'বলাইশিমুল'] },
          { id: 'durgapur_net', nameBn: 'দুর্গাপুর', nameEn: 'Durgapur', unions: ['বিরিশিরি', 'কুল্লাগড়া', 'গাঁওকান্দিয়া'] },
        ]
      },
      {
        id: 'sherpur',
        nameBn: 'শেরপুর',
        nameEn: 'Sherpur',
        upazilas: [
          { id: 'sherpur_sadar', nameBn: 'শেরপুর সদর', nameEn: 'Sherpur Sadar', unions: ['কামারিয়া', 'চরপক্ষীমারী', 'লছমনপুর'] },
          { id: 'nakla', nameBn: 'নকলা', nameEn: 'Nakla', unions: ['গণপদ্দী', 'বানেশ্বরদী', 'উরফা'] },
          { id: 'nalitabari', nameBn: 'নালিতাবাড়ী', nameEn: 'Nalitabari', unions: ['নন্নী', 'কাকোরকান্দি', 'পোড়াগাঁও'] },
        ]
      }
    ]
  }
];

// Helper functions for dynamic cascade
export function getDistrictsByDivision(divisionId: string): DistrictInfo[] {
  const division = BANGLADESH_DIVISIONS.find(d => d.id === divisionId || d.nameBn === divisionId || d.nameEn.toLowerCase() === divisionId.toLowerCase());
  return division ? division.districts : [];
}

export function getUpazilasByDistrict(districtId: string) {
  for (const div of BANGLADESH_DIVISIONS) {
    const dist = div.districts.find(d => d.id === districtId || d.nameBn === districtId || d.nameEn.toLowerCase() === districtId.toLowerCase());
    if (dist) return dist.upazilas;
  }
  return [];
}

export function getUnionsByUpazila(districtId: string, upazilaId: string): string[] {
  const upazilas = getUpazilasByDistrict(districtId);
  const upazila = upazilas.find(u => u.id === upazilaId || u.nameBn === upazilaId || u.nameEn.toLowerCase() === upazilaId.toLowerCase());
  if (upazila && upazila.unions && upazila.unions.length > 0) {
    return upazila.unions;
  }
  // Standard wards fallback for any upazila
  return ['ওয়ার্ড ০১', 'ওয়ার্ড ০২', 'ওয়ার্ড ০৩', 'ওয়ার্ড ০৪', 'ওয়ার্ড ০৫', 'সদর ইউনিয়ন'];
}

export const WARDS_LIST = [
  'ওয়ার্ড ০১',
  'ওয়ার্ড ০২',
  'ওয়ার্ড ০৩',
  'ওয়ার্ড ০৪',
  'ওয়ার্ড ০৫',
  'ওয়ার্ড ০৬',
  'ওয়ার্ড ০৭',
  'ওয়ার্ড ০৮',
  'ওয়ার্ড ০৯',
];
