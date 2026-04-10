import { Heart, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Contact</h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Address */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-sm font-medium text-slate-500 mb-1">Adresse</h3>
            <p className="text-slate-900 font-semibold">
              Rue Marmoucha, École Imam Malik, Fès, Maroc
            </p>
          </div>

          {/* Phone */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-slate-500 mb-1">Téléphone</h3>
            <p className="text-slate-900 font-semibold" dir="ltr">0535 96 08 59</p>
          </div>

          {/* Email */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-sm font-medium text-slate-500 mb-1">Email</h3>
            <p className="text-slate-900 font-semibold">assabahautisme@gmail.com</p>
          </div>

          {/* Working Hours */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-sm font-medium text-slate-500 mb-1">Horaires</h3>
            <p className="text-slate-900 font-semibold">Lundi — Vendredi : 08:30 - 15:30</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-600">
          <div className="flex items-center justify-center mb-2">
            <Heart className="w-5 h-5 text-primary-500" />
          </div>
          <p className="text-sm">
            Tous droits réservés © {year} Association Assabah pour enfants autistes
          </p>
        </div>
      </div>
    </footer>
  );
}
