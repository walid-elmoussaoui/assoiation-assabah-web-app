import { Link } from "react-router-dom";
import { Calendar, Users, Puzzle, Brain, MessageCircle, ArrowLeft } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-primary-700 overflow-hidden">
        {/* Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm font-medium mb-8 border border-white/20">
            <span>🌟</span>
            <span>Depuis 2014 — Maroc</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Association Assabah <br />pour enfants autistes
          </h1>
          
          <p className="text-lg md:text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            L’association Assabah a été créée en 2014 à partir d’un constat simple : l’autisme n’est pas une fatalité.
            Il est possible d’aider les enfants ayant un trouble du spectre de l’autisme à progresser grâce aux thérapies éducatives et comportementales.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/booking"
              className="w-full sm:w-auto bg-white text-primary-700 hover:bg-primary-50 px-8 py-3.5 rounded-full font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Prendre rendez-vous
            </Link>
            <Link
              to="/founder"
              className="w-full sm:w-auto bg-primary-800/50 hover:bg-primary-800 text-white border border-primary-600 px-8 py-3.5 rounded-full font-semibold transition-colors flex items-center justify-center"
            >
              Découvrir le fondateur
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-primary-700">
            <div className="text-center pt-8 md:pt-0">
              <div className="text-4xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-primary-100">Enfants bénéficiaires</div>
            </div>
            <div className="text-center pt-8 md:pt-0">
              <div className="text-4xl font-bold text-yellow-400 mb-2">12</div>
              <div className="text-primary-100">Années d’expérience</div>
            </div>
            <div className="text-center pt-8 md:pt-0">
              <div className="text-4xl font-bold text-yellow-400 mb-2">98%</div>
              <div className="text-primary-100">Satisfaction des familles</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Nos services spécialisés</h2>
            <div className="w-16 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                <MessageCircle className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Orthophonie & langage</h3>
              <p className="text-slate-600 leading-relaxed">
                Séances individuelles pour améliorer la communication.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                <Puzzle className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Accompagnement TSA</h3>
              <p className="text-slate-600 leading-relaxed">
                Programmes ABA et intervention précoce adaptés à chaque enfant.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mb-6">
                <Brain className="w-7 h-7 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Soutien psycho‑moteur</h3>
              <p className="text-slate-600 leading-relaxed">
                Thérapie occupationnelle, comportement et renforcement des compétences.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Soutien aux familles</h3>
              <p className="text-slate-600 leading-relaxed">
                Guidance et accompagnement des parents au quotidien.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Votre enfant a besoin d’une évaluation ?</h2>
          <p className="text-primary-100 mb-8 text-lg">
            Prenez rendez-vous pour une première évaluation.
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 bg-transparent border border-white text-white hover:bg-white hover:text-primary-800 px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Commencer
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
