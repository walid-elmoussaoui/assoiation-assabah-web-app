import { useState } from "react";
import { Info, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";
import { useAlert } from "../lib/alert";

type BookingData = {
  age: string;
  symptoms: string[];
  previousTreatment: string;
  parentName: string;
  phone: string;
  date: string;
  time: string;
};

type SubmitPayload = {
  age: string;
  conditions: string; // comma-separated
  treatment: string;
  parentName: string;
  phone: string; // digits only
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  timestamp: string; // ISO
};

export default function Booking() {
  const { alert } = useAlert();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<BookingData>({
    age: "",
    symptoms: [],
    previousTreatment: "",
    parentName: "",
    phone: "",
    date: "",
    time: "",
  });

  const normalizePhoneDigits = (value: string) => value.replace(/[^\d]/g, "");
  const isValidPhoneDigits = (digitsOnly: string) => /^\d{8,15}$/.test(digitsOnly);

  const isWeekend = (yyyyMmDd: string) => {
    // Parse as UTC midnight to avoid timezone shift
    const d = new Date(`${yyyyMmDd}T00:00:00.000Z`);
    const day = d.getUTCDay(); // 0 Sun ... 6 Sat
    return day === 0 || day === 6;
  };

  const timeOptions = (() => {
    const out: string[] = [];
    // 08:30 -> 15:30 every 30 minutes
    const startMinutes = 8 * 60 + 30;
    const endMinutes = 15 * 60 + 30;
    for (let m = startMinutes; m <= endMinutes; m += 30) {
      const hh = String(Math.floor(m / 60)).padStart(2, "0");
      const mm = String(m % 60).padStart(2, "0");
      out.push(`${hh}:${mm}`);
    }
    return out;
  })();

  const normalizeApiError = (msg: string) => {
    // Map backend (English) messages to user-friendly Arabic.
    // (Keeps UI unchanged; only improves modal text.)
    if (msg.startsWith("Date is required")) return "La date du rendez-vous est obligatoire.";
    if (msg === "Closed on Saturday and Sunday.") return "Fermé le samedi et le dimanche. Veuillez choisir un autre jour.";
    if (msg.startsWith("Time is required")) return "L’heure est obligatoire.";
    if (msg.startsWith("Time must be between")) return "Veuillez choisir une heure entre 08:30 et 15:30.";
    return msg;
  };

  const handleSymptomToggle = (symptom: string) => {
    setData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  const validateStep1 = () => {
    if (!data.age) return "Veuillez sélectionner l’âge de l’enfant.";
    if (!data.symptoms?.length) return "Veuillez sélectionner au moins une condition.";
    if (!data.previousTreatment) return "Veuillez indiquer si un traitement/suivi a déjà eu lieu.";
    return null;
  };

  const validateStep2 = () => {
    const phoneDigits = normalizePhoneDigits(data.phone);
    if (!data.parentName?.trim()) return "Le nom du parent est obligatoire.";
    if (!data.phone) return "Le numéro de téléphone est obligatoire.";
    if (!isValidPhoneDigits(phoneDigits)) return "Numéro invalide. Chiffres uniquement (8 à 15 chiffres).";
    if (!data.date) return "La date du rendez-vous est obligatoire.";
    if (data.date && isWeekend(data.date)) return "Fermé le samedi et le dimanche. Veuillez choisir un autre jour.";
    if (!data.time) return "L’heure est obligatoire.";
    if (data.time && !timeOptions.includes(data.time)) return "Veuillez choisir une heure entre 08:30 et 15:30.";
    return null;
  };

  const submitToBackend = async () => {
    setIsSubmitting(true);
    try {
      const phoneDigits = normalizePhoneDigits(data.phone);
      const payload: SubmitPayload = {
        age: data.age,
        conditions: data.symptoms.join(", "),
        treatment: data.previousTreatment,
        parentName: data.parentName.trim(),
        phone: phoneDigits,
        date: data.date,
        time: data.time,
        timestamp: new Date().toISOString(),
      };

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let message = "Erreur lors de l’envoi. Veuillez réessayer.";
        try {
          const json = (await res.json()) as { error?: string };
          if (json?.error) message = normalizeApiError(json.error);
        } catch {
          // ignore JSON parse errors
        }
        throw new Error(message);
      }

      setStep(3);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur inattendue.";
      alert(message, { title: "Erreur" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      const err = validateStep1();
      if (err) {
        alert(err, { title: "Attention" });
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      const err = validateStep2();
      if (err) {
        alert(err, { title: "Attention" });
        return;
      }
      submitToBackend();
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary-900 mb-4">Prise de rendez-vous (Évaluation)</h1>
          <p className="text-slate-600">Merci de répondre à quelques questions pour bien préparer le rendez-vous.</p>
        </div>

        {/* Stepper */}
        <div className="mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
          <div className="absolute top-1/2 right-0 h-0.5 bg-primary-500 -translate-y-1/2 z-0 transition-all duration-500" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
          
          <div className="relative z-10 flex justify-between">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
                step >= 1 ? "bg-orange-400 text-white" : "bg-slate-200 text-slate-500"
              )}>
                1
              </div>
              <span className={cn("mt-2 text-sm font-medium", step >= 1 ? "text-primary-900" : "text-slate-500")}>Informations préliminaires</span>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
                step >= 2 ? "bg-primary-500 text-white" : "bg-slate-200 text-slate-500"
              )}>
                2
              </div>
              <span className={cn("mt-2 text-sm font-medium", step >= 2 ? "text-primary-900" : "text-slate-500")}>Détails du rendez-vous</span>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
                step >= 3 ? "bg-green-500 text-white" : "bg-slate-200 text-slate-500"
              )}>
                3
              </div>
              <span className={cn("mt-2 text-sm font-medium", step >= 3 ? "text-primary-900" : "text-slate-500")}>confirmation</span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="space-y-6">
          
          {step === 1 && (
            <>
              {/* Info Alert */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
                <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-blue-800 text-sm">
                  Ces questions nous aident à vous orienter vers le bon spécialiste. Vos réponses n’affectent pas la réservation.
                </p>
              </div>

              {/* Age Question */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4 text-lg">Quel est l’âge de votre enfant ?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["2 — 4 ans", "4 — 7 ans", "7 — 12 ans", "+12 ans"].map((age) => (
                    <label
                      key={age}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all",
                        data.age === age
                          ? "border-primary-500 bg-primary-50 text-primary-900"
                          : "border-slate-200 hover:border-primary-300 text-slate-700"
                      )}
                    >
                      <span className="font-medium">{age}</span>
                      <div className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center",
                        data.age === age ? "border-primary-500" : "border-slate-300"
                      )}>
                        {data.age === age && <div className="w-2.5 h-2.5 bg-primary-500 rounded-full"></div>}
                      </div>
                      <input
                        type="radio"
                        name="age"
                        value={age}
                        checked={data.age === age}
                        onChange={(e) => setData({ ...data, age: e.target.value })}
                        className="hidden"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Symptoms Question */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4 text-lg">Avez-vous remarqué… (plusieurs choix possibles)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Difficulté de parole",
                    "Hyperactivité (TDAH)",
                    "Signes d’autisme",
                    "Difficultés d’apprentissage",
                    "Problèmes de comportement",
                    "Retard global de développement"
                  ].map((symptom) => (
                    <label
                      key={symptom}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all",
                        data.symptoms.includes(symptom)
                          ? "border-primary-500 bg-primary-50 text-primary-900"
                          : "border-slate-200 hover:border-primary-300 text-slate-700"
                      )}
                    >
                      <span className="font-medium">{symptom}</span>
                      <div className={cn(
                        "w-5 h-5 rounded border flex items-center justify-center",
                        data.symptoms.includes(symptom) ? "border-primary-500 bg-primary-500" : "border-slate-300"
                      )}>
                        {data.symptoms.includes(symptom) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <input
                        type="checkbox"
                        checked={data.symptoms.includes(symptom)}
                        onChange={() => handleSymptomToggle(symptom)}
                        className="hidden"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Previous Treatment Question */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4 text-lg">Votre enfant a-t-il déjà eu un traitement ou un suivi médical ?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Oui, déjà suivi", "Non, première fois"].map((option) => (
                    <label
                      key={option}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all",
                        data.previousTreatment === option
                          ? "border-primary-500 bg-primary-50 text-primary-900"
                          : "border-slate-200 hover:border-primary-300 text-slate-700"
                      )}
                    >
                      <span className="font-medium">{option}</span>
                      <div className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center",
                        data.previousTreatment === option ? "border-primary-500" : "border-slate-300"
                      )}>
                        {data.previousTreatment === option && <div className="w-2.5 h-2.5 bg-primary-500 rounded-full"></div>}
                      </div>
                      <input
                        type="radio"
                        name="previousTreatment"
                        value={option}
                        checked={data.previousTreatment === option}
                        onChange={(e) => setData({ ...data, previousTreatment: e.target.value })}
                        className="hidden"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {data.symptoms.length > 0 && (
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3 items-start animate-in fade-in slide-in-from-bottom-4">
                  <Info className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-orange-800 text-sm leading-relaxed">
                    D’après vos réponses, nous vous recommandons de prendre rendez-vous pour une évaluation afin de définir l’accompagnement adapté.
                  </p>
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
              <h3 className="font-bold text-slate-900 text-xl mb-6">Informations personnelles & rendez-vous</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Nom du parent</label>
                  <input
                    type="text"
                    value={data.parentName}
                    onChange={(e) => setData({ ...data, parentName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    placeholder="Nom complet"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Téléphone</label>
                  <input
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-right"
                    placeholder="06XX XX XX XX"
                    dir="ltr"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Date souhaitée</label>
                  <input
                    type="date"
                    value={data.date}
                    onChange={(e) => {
                      const nextDate = e.target.value;
                      setData({ ...data, date: nextDate });
                      if (nextDate && isWeekend(nextDate)) {
                        alert("Fermé le samedi et le dimanche. Veuillez choisir un autre jour.", { title: "Attention" });
                      }
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Heure souhaitée</label>
                  <select
                    value={data.time}
                    onChange={(e) => setData({ ...data, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white"
                    required
                  >
                    <option value="">Choisir l’heure</option>
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Demande envoyée avec succès !</h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Merci pour votre confiance. Nous avons bien reçu votre demande et notre équipe vous contactera prochainement pour confirmer le rendez-vous.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl inline-block text-right mb-8">
                <p className="text-sm text-slate-500 mb-1">Nom : <span className="font-medium text-slate-900">{data.parentName}</span></p>
                <p className="text-sm text-slate-500">Téléphone : <span className="font-medium text-slate-900" dir="ltr">{data.phone}</span></p>
              </div>
              <br />
              <button
                onClick={() => window.location.href = '/'}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                Retour à l’accueil
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 3 && (
            <div className="flex items-center justify-between pt-6">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                  Retour
                </button>
              ) : <div></div>}
              
              <button
                onClick={handleNext}
                disabled={isSubmitting || (step === 2 && (!data.parentName || !data.phone || !data.date || !data.time))}
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white px-8 py-3 rounded-full font-medium transition-colors ml-auto"
              >
                {isSubmitting ? (
                  "Envoi..."
                ) : step === 1 ? (
                  <>
                    Continuer
                    <ArrowLeft className="w-4 h-4" />
                  </>
                ) : (
                  "Confirmer"
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
