import { ArrowRight, Database, KeyRound, Search } from "lucide-react";
import { Link } from "react-router-dom";
import CredentialPanel from "../components/CredentialPanel.jsx";

const capabilities = [
  { title: "Normalized geography", description: "States, districts, subdistricts, and villages with stable IDs.", icon: Database },
  { title: "Secure access", description: "API key and secret headers with request-level usage tracking.", icon: KeyRound },
  { title: "Fast lookup", description: "Indexed search endpoints built for forms, KYC, and logistics flows.", icon: Search }
];

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg bg-ink text-white shadow-soft">
        <div className="grid gap-8 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase text-blue-200">Production SaaS Capstone</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-normal md:text-5xl">All India Villages API Platform</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">
              A full-stack platform for B2B teams that need reliable Indian administrative geography in address,
              delivery, onboarding, and analytics workflows.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/search" className="btn bg-white text-ink hover:bg-slate-100">
                Explore Data
                <ArrowRight size={17} />
              </Link>
              <Link to="/docs" className="btn border border-white/20 text-white hover:bg-white/10">
                API Docs
              </Link>
            </div>
          </div>
          <div className="grid content-end gap-3">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-lg border border-white/10 bg-white/10 p-4">
                  <Icon size={20} className="text-blue-200" />
                  <p className="mt-3 font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <CredentialPanel />
    </div>
  );
}
