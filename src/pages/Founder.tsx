import { GraduationCap, BookOpen, Award } from "lucide-react";
import responsablePhoto from "../components/Responsable/responsable.jpg";

export default function Founder() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">Le fondateur & l’association</h1>
          <div className="w-12 sm:w-16 h-1 bg-yellow-400 rounded-full"></div>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-8">
          <div className="p-6 sm:p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start">
              {/* Avatar */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 shrink-0 rounded-full bg-teal-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                <img 
                  src={responsablePhoto}
                  alt="Fondatrice"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-right">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 sm:mb-3"> Nassoh Chadia</h2>
                <p className="text-primary-600 font-medium mb-4 sm:mb-6 text-sm sm:text-base">
                  Fondatrice & directrice de l'Association Assabah pour enfants autistes • Spécialiste psycho‑neuro
                </p>
                
                {/* <p className="text-slate-600 leading-relaxed mb-8">
                  أخصائي متخصص في التربية الخاصة وإعادة التأهيل، حامل لشهادة الدكتوراه من جامعة محمد الخامس. يؤمن بأن كل طفل يحمل في داخله إمكانيات هائلة تنتظر من يساعدها على البزوغ.
                </p> */}

                {/* Timeline */}
                <div className="space-y-6 text-right">
                  <h3 className="font-bold text-slate-900 mb-4">Parcours professionnel</h3>
                  
                  <div className="relative pl-4 border-r-2 border-slate-200 pr-6 space-y-8">
                    {/* <div className="relative">
                      <div className="absolute -right-[31px] top-1.5 w-4 h-4 rounded-full bg-yellow-400 border-4 border-white"></div>
                      <h4 className="font-bold text-slate-900">2010 — الحاضر</h4>
                      <p className="text-slate-600 text-sm mt-1">مؤسس ومدير جمعية نماء للطفولة والإعاقة</p>
                    </div> */}
                    
                    {/* <div className="relative">
                      <div className="absolute -right-[31px] top-1.5 w-4 h-4 rounded-full bg-yellow-400 border-4 border-white"></div>
                      <h4 className="font-bold text-slate-900">2006 — 2010</h4>
                      <p className="text-slate-600 text-sm mt-1">أخصائي نفسي في المستشفى الجامعي ابن رشد</p>
                    </div> */}
                    
                    {/* <div className="relative">
                      <div className="absolute -right-[31px] top-1.5 w-4 h-4 rounded-full bg-yellow-400 border-4 border-white"></div>
                      <h4 className="font-bold text-slate-900">2003 — 2006</h4>
                      <p className="text-slate-600 text-sm mt-1">باحث في التربية الخاصة، جامعة محمد الخامس</p>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-12 bg-primary-50 rounded-2xl p-6 border-r-4 border-primary-500">
              <p className="text-primary-900 font-medium text-lg italic text-center">
                " Notre mission : qu’aucun enfant ne reste seul face à ses défis — nous construisons ensemble un pont entre son potentiel et le monde. "
              </p>
            </div>
          </div>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
            {/* <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div> */}
            {/* <h3 className="text-xl font-bold text-slate-900 mb-2">الشهادات</h3> */}
            {/* <p className="text-slate-600 text-sm">دكتوراه علم النفس العصبي • ماستر التربية الخاصة • شهادة ABA الدولية</p> */}
          </div>

          {/* <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
            <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">المنشورات</h3>
            <p className="text-slate-600 text-sm">أكثر من 12 ورقة بحثية في مجال التدخل المبكر والتوحد</p>
          </div> */}

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center md:col-span-2">
            {/* <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-yellow-600" />
            </div> */}
            {/* <h3 className="text-xl font-bold text-slate-900 mb-2">التكريمات</h3> */}
            {/* <p className="text-slate-600 text-sm">جائزة التميز في خدمة الإعاقة 2018 • تكريم وزارة التضامن 2022</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
