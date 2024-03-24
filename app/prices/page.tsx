import Header from "@/components/header";
import Card from "@/components/card";
import Button from "@/components/button";
import Link from "next/link";
import Background from "@/components/background";

export default function Prices() {
    return (
        <>
            <Header />
            <main className="flex-1 flex gap-4 flex-row justify-center items-center">
                <div className="h-[720px] flex gap-4 flex-row justify-center items-center">

                    <Link className="h-full" href="/dashboard">
                        <Card className="h-full w-[400px] flex gap-4 flex-col hover:bg-gray-50 hover:border-gray-400 transition-all">
                            <h2 className="text-2xl font-bold text-center">Gratuit</h2>
                            <hr />
                            <ul className="flex gap-4 flex-col">
                                <li>
                                    <h3 className="font-bold">Gestion des tâches</h3>
                                    <ul className="ml-8 list-disc">
                                        <li>Ajouter</li>
                                        <li>Modifier</li>
                                        <li>Supprimer</li>
                                    </ul>
                                </li>
                                <li>
                                    <h3 className="font-bold">Propriétés de tâches</h3>
                                    <ul className="ml-8 list-disc">
                                        <li>Nom</li>
                                        <li>Description</li>
                                        <li>Status</li>
                                        <li>Favoris</li>
                                    </ul>
                                </li>
                                <li>
                                    <h3 className="font-bold">Notifications</h3>
                                    <ul className="ml-8 list-disc">
                                        <li>Date uniquement</li>
                                        <li>Date et heure</li>
                                        <li>Notification unique</li>
                                        <li>Notifications multiples</li>
                                    </ul>
                                </li>
                                <li>
                                    <h3 className="font-bold">Synchronisation</h3>
                                    <ul className="ml-8 list-disc">
                                        <li>Application web et mobile</li>
                                        <li>Nombre d&apos;appareils illimités</li>
                                    </ul>
                                </li>
                            </ul>
                            <div className="flex-1"></div>
                            <Button mode="style">Rester en Gratuit</Button>
                        </Card>
                    </Link>

                    <Link className="h-full" href="/subscribe">
                        <Card className="h-full w-[400px] flex gap-4 flex-col hover:bg-gray-50 hover:border-gray-400 transition-all">
                            <h2 className="text-2xl font-bold text-center">Abonnement</h2>
                            <hr />
                            <ul className="flex gap-4 flex-col">
                                <li><h3 className="font-bold">Propriétés des tâches</h3>
                                    <ul className="ml-8 list-disc">
                                        <li>Sous-tâches</li>
                                        <li>Priorité</li>
                                        <li>Progression</li>
                                        <li>Chronologie</li>
                                    </ul>
                                </li>
                                <li><h3 className="font-bold">Récurrence</h3>
                                    <ul className="ml-8 list-disc">
                                        <li>Intervalles</li>
                                        {/* <Info dataInfo="5 heures, 3 jours ou 2 semaines"/> */}
                                        <li>Jours de la semaine</li>
                                        {/* <Info dataInfo="mardis et jeudis"/> */}
                                        <li>Jours du mois</li>
                                        {/* <Info dataInfo="5ème et 9ème jours du mois"/> */}
                                        <li>Jours de l&apos;année</li>
                                        {/* <Info dataInfo="16 mars et 27 juin"/> */}
                                    </ul>
                                </li>
                                <li><h3 className="font-bold">Dates</h3>
                                    <ul className="ml-8 list-disc">
                                        <li>Date de début chronologie</li>
                                        <li>Date de fin chronologie</li>
                                        <li>Date de début récurrence</li>
                                        <li>Date de fin récurrence</li>
                                        <li>Date de création</li>
                                        <li>Date de modification</li>
                                    </ul>
                                </li>
                                <li><h3 className="font-bold">Abonnement</h3>
                                    <ul className="ml-8 list-disc">
                                        <li>Renouvellement automatique</li>
                                        <li>Changer la date de prélèvement</li>
                                        <li>Résiliation en un clic</li>
                                    </ul>
                                </li>
                            </ul>
                            <div className="flex-1"></div>
                            <Button mode="style">S&apos;abonner au Premium</Button>
                        </Card>
                    </Link>

                </div>
            </main>
            <Background/>
        </>
    );
}
