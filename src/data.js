const IMG = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const PROJECTS = [
  { id: "kutahya-ticaret", no: "01", title: "Kütahya", titleIt: "Ticaret Merkezi", cat: "İç Mimarlık", where: "Kütahya, TR", year: "2024", area: "1.200 m²", status: "Tamamlandı", role: "İç Mimarlık · Mobilya",
    summary: "Çalca OSB bölgesindeki ticaret merkezinin tam kapsamlı iç mimarlık ve mobilya donanımı. Üretim alanından showroom'a uzanan bütünleşik tasarım çözümü.",
    img: IMG("1497366216548-37526070297c"),
    gallery: [IMG("1600585154340-be6161a56a0c"), IMG("1600566753190-17f0baa2a6c3"), IMG("1556909114-f6e7ad7d3136")] },
  { id: "led-tabela-zincir", no: "02", title: "LED", titleIt: "Tabela Sistemi", cat: "LED Tabela", where: "Kütahya / Eskişehir, TR", year: "2024", area: "—", status: "Aktif", role: "LED · Tabela Tasarım",
    summary: "Bölge genelinde 12 noktada uygulanan LED ışıklı tabela sistemi. Gündüz ve gece görünürlüğü optimize edilen alüminyum kasalı kutu harf uygulaması.",
    img: IMG("1558618666-fcd25c85cd64"),
    gallery: [IMG("1551516594-56cb78394645"), IMG("1497215728101-856f4ea42174"), IMG("1504307651254-35680f356dfd")] },
  { id: "ofis-mobilya", no: "03", title: "Ofis", titleIt: "Mobilya Serisi", cat: "Mobilya", where: "Kütahya, TR", year: "2023", area: "—", status: "Tamamlandı", role: "Mobilya Tasarım · Üretim",
    summary: "OSB bölgesindeki firmalara yönelik modüler ofis mobilya serisi. Ergonomi ve dayanıklılık öncelikli tasarım; MDF, metal ve kumaş kombinasyonu.",
    img: IMG("1555041469-149851dc8909"),
    gallery: [IMG("1493809842364-78817add7ffb"), IMG("1503387762-592deb58ef4e"), IMG("1444653614773-b1220b7d3aca")] },
  { id: "dis-mekan-reklam", no: "04", title: "Dış Mekan", titleIt: "Reklam Uygulaması", cat: "Reklam", where: "Kütahya, TR", year: "2024", area: "—", status: "Tamamlandı", role: "Dış Mekan Reklam",
    summary: "Kent merkezinde totem, billboard ve branda uygulamalarını kapsayan bütünleşik dış mekan reklam kampanyası. Baskı, montaj ve aydınlatma dahil.",
    img: IMG("1600607687939-ce8a6c25118c"),
    gallery: [IMG("1600566753086-00f18fb6b3ea"), IMG("1520637836862-4d197d17c50a"), IMG("1564501049412-61c2a3083791")] },
  { id: "magaza-ic-mimarlık", no: "05", title: "Mağaza", titleIt: "İç Tasarım", cat: "İç Mimarlık", where: "Merkez / Kütahya", year: "2025", area: "320 m²", status: "Devam Ediyor", role: "İç Mimarlık · Dekor",
    summary: "Perakende satış mağazasının yeniden düzenlenmesi. Ürün teşhiri ve müşteri akışı odaklı raf sistemleri, aydınlatma tasarımı ve kaplama uygulamaları.",
    img: IMG("1497366811353-6870744d04b2"),
    gallery: [IMG("1497366754035-f200968a6e72"), IMG("1600210491892-03d54c0aaf87"), IMG("1600585154526-990dced4db0d")] },
  { id: "ahsap-mobilya", no: "06", title: "Ahşap", titleIt: "Özel Üretim", cat: "Mobilya", where: "Kütahya, TR", year: "2025", area: "—", status: "Üretimde", role: "Mobilya Tasarım · Üretim",
    summary: "Villa projesi için sipariş üzerine üretilen masif ahşap mobilya koleksiyonu. Ceviz ve meşe kombinasyonu; el işçiliği ve CNC kesim birlikteliği.",
    img: IMG("1518780664697-55e3ad937233"),
    gallery: [IMG("1512917774080-9991f1c4c750"), IMG("1486325212027-8081e485255e"), IMG("1494522358652-f30e61a60313")] },
  { id: "ic-mekan-reklam", no: "07", title: "İç Mekan", titleIt: "Reklam & Yönlendirme", cat: "Reklam", where: "Alışveriş Merkezi / Kütahya", year: "2022", area: "—", status: "Tamamlandı", role: "İç Mekan Reklam",
    summary: "AVM içi yönlendirme sistemi, ışıklı mağaza tabelaları ve tanıtım standlarının tasarım, üretim ve montajı. Toplamda 47 uygulama noktası.",
    img: IMG("1604014237800-1c9102c219da"),
    gallery: [IMG("1487958449943-2429e8be8625"), IMG("1542314831-068cd1dbfeeb"), IMG("1571896349842-33c89424de2d")] },
  { id: "kurumsal-tabela", no: "08", title: "Kurumsal", titleIt: "Tabela Sistemi", cat: "Reklam", where: "OSB / Kütahya", year: "2023", area: "—", status: "Tamamlandı", role: "Dış Mekan Reklam",
    summary: "Sanayi bölgesindeki kurumsal firmalara yönelik bütünleşik tabela ve yönlendirme sistemi. Alüminyum kompozit kaplama, kutu harf ve dijital baskı uygulamaları.",
    img: IMG("1486325212027-8081e485255e"),
    gallery: [IMG("1497215728101-856f4ea42174"), IMG("1564501049412-61c2a3083791"), IMG("1520637836862-4d197d17c50a")] },
  { id: "led-aydinlatma", no: "09", title: "LED", titleIt: "Aydınlatma Projesi", cat: "LED Tabela", where: "Kütahya Merkez, TR", year: "2023", area: "—", status: "Tamamlandı", role: "LED Tasarım · Uygulama",
    summary: "Şehir merkezi cadde cephelerinde uygulanan LED aydınlatma ve tabela sistemi. Enerji tasarruflu RGB modüller ve programlanabilir kontrol ünitesi.",
    img: IMG("1504307651254-35680f356dfd"),
    gallery: [IMG("1558618666-fcd25c85cd64"), IMG("1551516594-56cb78394645"), IMG("1497215728101-856f4ea42174")] },
  { id: "led-magaza", no: "10", title: "Mağaza", titleIt: "LED Cephe", cat: "LED Tabela", where: "Kütahya, TR", year: "2024", area: "—", status: "Aktif", role: "LED · Tabela Tasarım",
    summary: "Perakende mağaza cephesinde uygulanan LED kanal harf ve arka aydınlatmalı totem sistemi. Gündüz ve gece görünürlüğü için optimize edilmiş çözüm.",
    img: IMG("1571896349842-33c89424de2d"),
    gallery: [IMG("1504307651254-35680f356dfd"), IMG("1558618666-fcd25c85cd64"), IMG("1551516594-56cb78394645")] },
];

export const CATEGORIES = ["Reklam", "İç Mimarlık", "Mobilya", "LED Tabela"];

export const PILLARS = [
  { no: "01", title: "Tasarım", it: "kalitesi", desc: "Her projeyi işlevsellik ve estetik dengesinde kuruyoruz; görsellik kadar uygulanabilirlik de tasarımın merkezinde." },
  { no: "02", title: "Işık &", it: "görünürlük", desc: "LED teknolojisi ve aydınlatma tasarımıyla markaları hem gündüz hem gece etkili kılıyoruz." },
  { no: "03", title: "Mekan", it: "deneyimi", desc: "İç mimarlık ve mobilyayı bütün olarak ele alıyor; yaşanabilir, çalışılabilir mekanlar tasarlıyoruz." },
  { no: "04", title: "Üretim &", it: "teslim", desc: "Tasarımdan üretime, montajdan teslimata tüm süreç BSD bünyesinde yürütülür. Aracısız, eksiksiz.", },
];

export const CLIENTS = [
  "KÜTAHYA SERAMİK", "ÇATEKS", "GÜRAL PORSELAN", "ALINUR MOBİLYA", "ÇAĞDAŞ İNŞAAT", "PORSELEN ÇARŞI", "DOMİNO REKLAM", "KUTSO", "PETEK GRUP", "ZAFER PLAZa", "OSB YÖNETİM", "HISARCIK BELEDİYESİ",
];

export const SOCIALS = [
  { lbl: "Instagram", url: "#" },
  { lbl: "Facebook", url: "#" },
  { lbl: "WhatsApp", url: "#" },
  { lbl: "LinkedIn", url: "#" },
];

export const HERO_SLIDES = [
  { img: IMG("1497366216548-37526070297c", 2200), num: "01 / 03" },
  { img: IMG("1555041469-149851dc8909", 2200), num: "02 / 03" },
  { img: IMG("1600607687939-ce8a6c25118c", 2200), num: "03 / 03" },
];
