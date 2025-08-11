import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { intelBuilds } from "../data/intelBuilds";
import { amdBuilds } from "../data/amdBuilds";
import { officeBuilds } from "../data/officeBuilds";
import { proBuilds } from "../data/proBuilds";
import { getName } from "../utils";
import { ArrowLeft } from "lucide-react";
import { useCart } from "../components/CartContext";

const PCDetails = () => {
  const { category, id } = useParams();
  const buildId = id;
  const navigate = useNavigate();
  const { addToCart } = useCart();

  let buildsArray;
  if (category === "intel") {
    buildsArray = intelBuilds;
  } else if (category === "amd") {
    buildsArray = amdBuilds;
  } else if (category === "office") {
    buildsArray = officeBuilds;
  } else if (category === "pro") {
    buildsArray = proBuilds;
  } else {
    buildsArray = [];
  }

  const build = buildsArray.find((b) => b.id === buildId);

  if (!build) {
    return (
      <>
        <div className="bg-black text-white min-h-screen flex items-center justify-center">
          <h2 className="text-2xl font-bold">Сборка не найдена</h2>
        </div>
        <Footer />
      </>
    );
  }

  const s = build.specs;

  return (
    <>
      <main className="bg-black text-white min-h-screen px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Кнопка "Назад" */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-yellow-400 hover:underline mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Назад
          </button>

          {/* Верхняя часть с картинкой и информацией */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 flex flex-col justify-center">
              <h1 className="text-4xl font-bold mb-4">{build.name}</h1>
              <div className="text-3xl font-extrabold text-yellow-400 mb-6">
                {build.price}
              </div>
              <div className="flex gap-6 mb-8">
                <button
                  onClick={() => {
                    addToCart(build);
                    navigate("/cart");
                  }}
                  className="gold-button px-6 py-3 rounded hover:bg-yellow-600 transition">
                  Купить
                </button>

                <button
                  onClick={() => {
                    navigate("/configurator");
                  }}
                  className="gold-button px-6 py-3 rounded hover:bg-yellow-600 transition">
                  Изменить конфигурацию
                </button>
              </div>
            </div>

            <div className="lg:w-1/2 flex items-center justify-center">
              <img
                src={build.image}
                alt={build.name}
                className="max-w-full max-h-[400px] object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Конфигурация */}
          <section className="mt-12 bg-[#151515] rounded-xl p-6 shadow-lg max-w-full">
            <h2 className="text-2xl font-bold mb-6 border-b border-yellow-500 pb-2">
              Конфигурация
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Корпус */}
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  Корпус
                </h3>
                <p>
                  <strong>Название корпуса:</strong> {getName(s.case)}
                </p>
                <p>
                  <strong>Форм-фактор совместимых плат:</strong>{" "}
                  {s.case?.formFactor || "Нет"}
                </p>
                <p>
                  <strong>Типоразмер корпуса:</strong>{" "}
                  {s.case?.typeSize || "Нет"}
                </p>
                <p>
                  <strong>Максимальная длина видеокарты, мм:</strong>{" "}
                  {s.case?.maxGpuLength || "Нет"}
                </p>
                <p>
                  <strong>Подсветка:</strong> {s.case?.lighting || "Нет"}
                </p>
                <p>
                  <strong>Габариты (мм) ГxШxВ:</strong>{" "}
                  {s.case?.dimensions || "Нет"}
                </p>
              </div>

              {/* Блок питания */}
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  Блок питания
                </h3>
                <p>
                  <strong>Название блока питания:</strong> {getName(s.psu)}
                </p>
                <p>
                  <strong>Мощность (номинал):</strong> {s.psu?.power || "Нет"}
                </p>
                <p>
                  <strong>Сертификация 80 PLUS:</strong>{" "}
                  {s.psu?.certification || "Нет"}
                </p>
                <p>
                  <strong>Система охлаждения:</strong> {s.psu?.cooling || "Нет"}
                </p>
                <p>
                  <strong>Подсветка:</strong> {s.psu?.lighting || "Нет"}
                </p>
                <p>
                  <strong>Отстегивающиеся кабели:</strong>{" "}
                  {s.psu?.detachableCables || "Нет"}
                </p>
              </div>

              {/* Система охлаждения */}
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  Система охлаждения
                </h3>
                <p>
                  <strong>Название:</strong> {getName(s.cooling)}
                </p>
                <p>
                  <strong>Материал водоблока:</strong>{" "}
                  {s.cooling?.waterBlockMaterial || "Нет"}
                </p>
                <p>
                  <strong>Материал радиатора:</strong>{" "}
                  {s.cooling?.radiatorMaterial || "Нет"}
                </p>
                <p>
                  <strong>Минимальная скорость вращения:</strong>{" "}
                  {s.cooling?.minSpeed || "Нет"}
                </p>
                <p>
                  <strong>Максимальная скорость вращения (об/мин):</strong>{" "}
                  {s.cooling?.maxSpeed || "Нет"}
                </p>
                <p>
                  <strong>Рассеиваемая мощность (Вт):</strong>{" "}
                  {s.cooling?.tdp || "Нет"}
                </p>
                <p>
                  <strong>Подсветка вентилятора:</strong>{" "}
                  {s.cooling?.fanLighting || "Нет"}
                </p>
              </div>

              {/* Жесткий диск */}
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  Жесткий диск
                </h3>
                <p>
                  <strong>Название:</strong> {getName(s.hdd)}
                </p>
                <p>
                  <strong>Объем:</strong> {s.hdd?.capacity || "Нет"}
                </p>
                <p>
                  <strong>Скорость чтения:</strong> {s.hdd?.readSpeed || "Нет"}
                </p>
                <p>
                  <strong>Объем кэш-памяти:</strong> {s.hdd?.cacheSize || "Нет"}
                </p>
                <p>
                  <strong>Скорость вращения шпинделя:</strong>{" "}
                  {s.hdd?.spindleSpeed || "Нет"}
                </p>
                <p>
                  <strong>Гибридный SSHD накопитель (Объем SSD):</strong>{" "}
                  {s.hdd?.hybrid || "Нет"}
                </p>
              </div>

              {/* Материнская плата */}
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  Материнская плата
                </h3>
                <p>
                  <strong>Название:</strong> {getName(s.motherboard)}
                </p>
                <p>
                  <strong>Сокет:</strong> {s.motherboard?.socket || "Нет"}
                </p>
                <p>
                  <strong>Чипсет:</strong> {s.motherboard?.chipset || "Нет"}
                </p>
                <p>
                  <strong>Поддержка SLI/CrossFire:</strong>{" "}
                  {s.motherboard?.sliCrossfireSupport || "Нет"}
                </p>
                <p>
                  <strong>Максимальная частота памяти (МГц):</strong>{" "}
                  {s.motherboard?.maxMemoryFreq || "Нет"}
                </p>
                <p>
                  <strong>Количество каналов памяти:</strong>{" "}
                  {s.motherboard?.memoryChannels || "Нет"}
                </p>
                <p>
                  <strong>Сеть:</strong> {s.motherboard?.network || "Нет"}
                </p>
              </div>

              {/* Оперативная память */}
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  Оперативная память
                </h3>
                <p>
                  <strong>Название:</strong> {getName(s.ram)}
                </p>
                <p>
                  <strong>Тип памяти:</strong> {s.ram?.type || "Нет"}
                </p>
                <p>
                  <strong>Объем комплекта памяти:</strong>{" "}
                  {s.ram?.kitSize || "Нет"}
                </p>
                <p>
                  <strong>Тактовая частота:</strong> {s.ram?.frequency || "Нет"}
                </p>
                <p>
                  <strong>Профили Intel XMP:</strong>{" "}
                  {s.ram?.intelXMPProfiles || "Нет"}
                </p>
              </div>

              {/* Процессор */}
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  Процессор
                </h3>
                <p>
                  <strong>Название:</strong> {getName(s.cpu)}
                </p>
                <p>
                  <strong>Архитектура:</strong> {s.cpu?.architecture || "Нет"}
                </p>
                <p>
                  <strong>Техпроцесс:</strong> {s.cpu?.processTech || "Нет"}
                </p>
                <p>
                  <strong>Количество ядер/потоков:</strong>{" "}
                  {s.cpu?.coresThreads || "Нет"}
                </p>
                <p>
                  <strong>Объем кэша L3:</strong> {s.cpu?.l3Cache || "Нет"}
                </p>
                <p>
                  <strong>Базовая частота процессора (ГГц):</strong>{" "}
                  {s.cpu?.baseClock || "Нет"}
                </p>
                <p>
                  <strong>Максимальная частота в турбо режиме (ГГц):</strong>{" "}
                  {s.cpu?.turboClock || "Нет"}
                </p>
                <p>
                  <strong>Тепловыделение (TDP):</strong> {s.cpu?.tdp || "Нет"}
                </p>
              </div>

              {/* Видеокарта */}
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  Видеокарта
                </h3>
                <p>
                  <strong>Название:</strong> {getName(s.gpu)}
                </p>
                <p>
                  <strong>Графический процессор:</strong>{" "}
                  {s.gpu?.gpuChip || "Нет"}
                </p>
                <p>
                  <strong>Объем видеопамяти:</strong> {s.gpu?.vram || "Нет"}
                </p>
                <p>
                  <strong>Максимальное разрешение:</strong>{" "}
                  {s.gpu?.maxResolution || "Нет"}
                </p>
                <p>
                  <strong>Видео разъемы:</strong> {s.gpu?.videoOutputs || "Нет"}
                </p>
                <p>
                  <strong>Шина ОЗУ:</strong> {s.gpu?.memoryBus || "Нет"}
                </p>
              </div>

              {/* SSD накопители */}
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  Твердотельные SSD накопители
                </h3>
                <p>
                  <strong>Название:</strong> {getName(s.ssd)}
                </p>
                <p>
                  <strong>Объем накопителя:</strong> {s.ssd?.capacity || "Нет"}
                </p>
                <p>
                  <strong>Максимальная скорость записи:</strong>{" "}
                  {s.ssd?.maxWriteSpeed || "Нет"}
                </p>
                <p>
                  <strong>Максимальная скорость чтения:</strong>{" "}
                  {s.ssd?.maxReadSpeed || "Нет"}
                </p>
                <p>
                  <strong>Форм-фактор:</strong> {s.ssd?.formFactor || "Нет"}
                </p>
                <p>
                  <strong>Тип чипов памяти:</strong>{" "}
                  {s.ssd?.memoryType || "Нет"}
                </p>
              </div>

              {/* Операционная система */}
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  Операционная система
                </h3>
                {s.os ? (
                  <>
                    <p>
                      <strong>Название:</strong> {s.os.name || "Нет"}
                    </p>
                    <p>
                      <strong>Разрядность:</strong> {s.os.architecture || "Нет"}
                    </p>
                    <p>
                      <strong>Срок действия лицензии:</strong>{" "}
                      {s.os.licenseDuration || "Нет"}
                    </p>
                    <p>
                      <strong>Тип издания:</strong> {s.os.editionType || "Нет"}
                    </p>
                  </>
                ) : (
                  <p>Нет</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PCDetails;
