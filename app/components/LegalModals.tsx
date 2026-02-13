'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';

const privacyContent = (
  <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
    <p>
      Настоящая Политика конфиденциальности определяет порядок обработки и защиты TRIADA GROUP (далее — «мы», «компания») персональных данных пользователей сайта и клиентов.
    </p>
    <h3 className="font-semibold text-white pt-2">1. Какие данные мы собираем</h3>
    <p>
      При обращении через форму заявки, email, мессенджеры или телефон мы можем получать: имя, контактный email, номер телефона, название компании и содержание обращения. Технические данные: IP-адрес, тип браузера, данные cookie — для работы сайта и аналитики.
    </p>
    <h3 className="font-semibold text-white pt-2">2. Цели использования</h3>
    <p>
      Данные используются для связи с вами, подготовки коммерческих предложений, исполнения договоров и улучшения работы сайта и сервисов. Мы не передаём ваши персональные данные третьим лицам для маркетинга без вашего согласия.
    </p>
    <h3 className="font-semibold text-white pt-2">3. Хранение и защита</h3>
    <p>
      Мы храним персональные данные в течение срока, необходимого для оказания услуг и выполнения требований законодательства. Применяются организационные и технические меры для защиты данных от несанкционированного доступа.
    </p>
    <h3 className="font-semibold text-white pt-2">4. Ваши права</h3>
    <p>
      Вы вправе запросить доступ к своим данным, их исправление или удаление. Для этого достаточно направить запрос на triada.workspace@gmail.com.
    </p>
    <h3 className="font-semibold text-white pt-2">5. Изменения</h3>
    <p>
      Мы можем обновлять Политику конфиденциальности. Актуальная версия всегда доступна на этой странице. Продолжение использования сайта после изменений означает принятие обновлённой политики.
    </p>
    <p className="text-slate-500 pt-2">
      Дата последнего обновления: 2026 г. Контакты: triada.workspace@gmail.com
    </p>
  </div>
);

const termsContent = (
  <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
    <p>
      Настоящие Условия использования регулируют порядок использования сайта и услуг TRIADA GROUP (далее — «компания», «мы»). Используя сайт и отправляя заявки, вы соглашаетесь с этими условиями.
    </p>
    <h3 className="font-semibold text-white pt-2">1. Общие положения</h3>
    <p>
      Сайт и все материалы на нём предназначены для информирования об услугах компании. Запрещается копирование, распространение и использование материалов сайта без письменного согласия компании, за исключением личного некоммерческого просмотра.
    </p>
    <h3 className="font-semibold text-white pt-2">2. Услуги и заявки</h3>
    <p>
      Отправка заявки через сайт или контакты не создаёт обязательств по заключению договора. Мы связываемся с вами для уточнения задачи и направляем коммерческое предложение. Окончательные условия определяются договором.
    </p>
    <h3 className="font-semibold text-white pt-2">3. Интеллектуальная собственность</h3>
    <p>
      Все права на дизайн, тексты, логотипы и иные материалы сайта принадлежат TRIADA GROUP или указанным правообладателям. Результаты работ по договорам с клиентами передаются в объёме и на условиях, закреплённых в договоре.
    </p>
    <h3 className="font-semibold text-white pt-2">4. Ограничение ответственности</h3>
    <p>
      Сайт предоставляется «как есть». Мы не несём ответственности за временную недоступность сайта, сбои по независящим от нас причинам, а также за действия пользователей за пределами нашего сайта. В максимальной степени, допустимой законом, наша ответственность ограничена суммой договора по конкретному проекту.
    </p>
    <h3 className="font-semibold text-white pt-2">5. Применимое право</h3>
    <p>
      К данным условиям и отношениям сторон применяется законодательство Республики Казахстан. Споры разрешаются путём переговоров, при недостижении согласия — в суде по месту нахождения компании.
    </p>
    <p className="text-slate-500 pt-2">
      Дата последнего обновления: 2026 г. По вопросам: triada.workspace@gmail.com
    </p>
  </div>
);

const modalContentClass =
  'bg-slate-900 border-white/10 text-white max-w-2xl w-[calc(100%-2rem)] max-h-[90vh] sm:max-h-[85vh] flex flex-col p-0 overflow-hidden rounded-2xl shadow-2xl [&>button]:text-slate-400 [&>button:hover]:text-white';

export function LegalModals({
  openPrivacy,
  openTerms,
  onClosePrivacy,
  onCloseTerms,
}: {
  openPrivacy: boolean;
  openTerms: boolean;
  onClosePrivacy: () => void;
  onCloseTerms: () => void;
}) {
  return (
    <>
      <Dialog open={openPrivacy} onOpenChange={(open) => !open && onClosePrivacy()}>
        <DialogContent
          className={modalContentClass}
          aria-describedby={undefined}
        >
          <DialogHeader className="px-4 sm:px-6 pr-12 pt-5 sm:pt-6 pb-4 border-b border-white/10 shrink-0">
            <DialogTitle className="text-lg sm:text-xl font-semibold text-white">
              Политика конфиденциальности
            </DialogTitle>
          </DialogHeader>
          <div className="px-4 sm:px-6 py-4 overflow-y-auto flex-1 min-h-0">
            {privacyContent}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openTerms} onOpenChange={(open) => !open && onCloseTerms()}>
        <DialogContent
          className={modalContentClass}
          aria-describedby={undefined}
        >
          <DialogHeader className="px-4 sm:px-6 pr-12 pt-5 sm:pt-6 pb-4 border-b border-white/10 shrink-0">
            <DialogTitle className="text-lg sm:text-xl font-semibold text-white">
              Условия использования
            </DialogTitle>
          </DialogHeader>
          <div className="px-4 sm:px-6 py-4 overflow-y-auto flex-1 min-h-0">
            {termsContent}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
