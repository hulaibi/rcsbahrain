import type { Metadata } from 'next';
import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CmsContent } from '@/components/shared/CmsContent';
import { getPageBySlug } from '@/lib/api/pages';
import { ApiClientError } from '@/lib/api/client';

interface AboutPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);

  try {
    const page = await getPageBySlug('about', locale);

    return {
      title: page.title,
      description: page.excerpt ?? dict.org.description,
      alternates: {
        canonical: `/${locale}/about`,
        languages: {
          ar: '/ar/about',
          en: '/en/about',
        },
      },
      openGraph: {
        title: page.title,
        description: page.excerpt ?? dict.org.description,
        type: 'article',
        locale: locale === 'ar' ? 'ar_BH' : 'en_BH',
      },
    };
  } catch {
    return {
      title: dict.nav.about,
      description: dict.org.description,
    };
  }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const aboutNarrative =
    locale === 'ar'
      ? {
          eyebrow: 'نبذة عن جمعية الهلال الأحمر البحريني',
          headline: 'منذ عام 1971، ونحن نخدم الإنسانية',
          intro:
            'الهلال الأحمر البحريني جمعية خيرية تطوعية تأسست سنة 1971م. وتم الاعتراف الدولي به في 14 سبتمبر 1972 من قبل اللجنة الدولية للصليب الأحمر بجنيف، وانضم إلى الاتحاد الدولي لجمعيات الصليب الأحمر والهلال الأحمر في نفس العام.',
          imageAlt: 'صورة من أنشطة جمعية الهلال الأحمر البحريني',
          historyTitle: 'تاريخ الجمعية',
          historyParagraphs: [
            'كان أول اجتماع للجنة التأسيسية لهذه الجمعية انعقد في قاعة بلدية المنامة في يوم 28 يناير 1970 حيث تكونت من 24 عضوا مؤسسا اختيروا من كبار رجال الأعمال التجار وموظفي الدولة.',
            'وقد تأسست هذه الجمعية الأهلية وسجلت لدى الجهات الحكومية المختصة وصدرت براءة التأسيس من حضرة صاحب السمو الشيخ عيسى بن سلمان آل خليفة أمير البلاد رحمه الله، بتاريخ 29 يونيه 1970. وقد تم الاعتراف الدولي بهذه الجمعية من قبل اللجنة الدولية للصليب الأحمر والاتحاد الدولي لجمعيات الصليب الأحمر والهلال الأحمر في 14 سبتمبر 1972 وصارت جمعية الهلال الأحمر البحريني هي العضو رقم 116 في المجموعة الدولية.',
          ],
          missionTitle: 'مهمتنا',
          missionItems: [
            {
              title: 'التعاون الدولي',
              description:
                'المساهمة مع شركائنا بالحركة الدولية للصليب والهلال الأحمر في التخفيف من الآلام البشرية.',
            },
            {
              title: 'المساعدات الإنسانية',
              description:
                'تقديم خدمات اجتماعية وإنسانية تتفق مع رسالة الهلال الأحمر.',
            },
            {
              title: 'التدريب والتعليم',
              description:
                'العمل على نشر مبادئ الحركة الدولية، وتدريب وتأهيل متطوعين بالعمل الإنساني وفق مبادئ الحركة، والمساهمة في نشر القانون الدولي الإنساني وتقديم الخدمات والمساعدات للمحتاجين.',
            },
          ],
          principlesTitle: 'مبادئ الجمعية',
          principlesIntro:
            'تهدف جمعية الهلال الأحمر البحريني إلى تحقيق الأغراض الإنسانية للصليب الأحمر الدولي سواء في داخل البحرين أو خارجها، تطبيقا لمبدأ التعاون الإنساني الدولي الذي أقرته معاهدات جنيف الدولية ووفقا للمبادئ الأساسية لجمعيات الهلال والصليب الأحمر وهي:',
          principlesItems: [
            {
              title: 'الإنسانية',
              description:
                'إن الهلال الأحمر الذي أسس لمد يد العون إلى الجنود والجرحى في ميادين القتال دون أي تمييز يحاول جاهدا التخفيف من الآلام الإنسانية وحماية الحياة البشرية والصحة العامة والذات الإنسانية وتحسين التفاهم والصداقة والتعاون بين الشعوب.',
            },
            {
              title: 'عدم التحيز',
              description:
                'يؤدي الهلال الأحمر رسالته دون أي تمييز من حيث الجنسية والعنصر والديانة والحالة الاجتماعية والمذهب السياسي ويعمل جاهدا لمد يد العون دون تفرقة أو تمييز بين الأجناس.',
            },
            {
              title: 'الحياد',
              description:
                'يمتنع الهلال الأحمر من الاشتراك في أي نزاع محافظة على ثقة الجميع، كما يتجنب دائما الدخول في الجدالات السياسية والعنصرية والدينية والفكرية أيا كانت.',
            },
            {
              title: 'الاستقلال',
              description:
                'الهلال الأحمر منظمة مستقلة، ورغم أن جمعياته الوطنية تعد هيئات مساعدة للسلطات العامة وخاضعة لقوانين بلادها إلا أنها تتمسك باستقلالها للعمل طبقا لمبادئ الصليب والهلال الأحمر.',
            },
            {
              title: 'الطابع الخيري',
              description:
                'الهلال الأحمر منظمة خيرية تتطوع للإنقاذ والإغاثة ولا تهدف إلى أي كسب مادي.',
            },
            {
              title: 'الطابع الوحدوي',
              description:
                'يحظر تأسيس أكثر من جمعية وطنية والجمعية ترحب بالجميع ويشمل عملها الإنساني كل أراضي البلاد.',
            },
            {
              title: 'العالمية',
              description:
                'الهلال الأحمر منظمة عالمية تحظى بحقوق متساوية وتوطد أواصر التكاتف والتعاون فيما بينها.',
            },
          ],
          boardTitle: 'اعضاء مجلس الادارة',
          boardIntro:
            'يتولى فريق القيادة المتفاني لدينا توجيه مهمة جمعية الهلال الأحمر البحريني.',
          boardLeadership: [
            { name: 'معالي الشيخ محمد بن عبدالله آل خليفة', role: 'رئيس الجمعية' },
            { name: 'السيد علي بن محمد مراد', role: 'نائب الرئيس' },
            { name: 'السيد مبارك خليفة الحادي', role: 'الأمين العام' },
            { name: 'السيد حسن علي جمعة', role: 'الأمين المالي' },
          ],
          boardMembersTitle: 'عضو مجلس الإدارة',
          boardMembers: [
            'د. فوزي عبدالله أمين',
            'د. فيصل رضي الموسوي',
            'السيد عادل حمد الجار',
            'الدكتورة مريم إبراهيم الهاجري',
            'الدكتورة كوثر محمد العيد',
            'الدكتورة نيلوفر أحمد جهرمي',
          ],
          regulationsTitle: 'قوانين الجمعية',
          regulationsIntro:
            'الوثائق الرسمية واللوائح المنظمة لجمعية الهلال الأحمر البحريني. توضح هذه الوثائق هيكلنا التنظيمي وحوكمتنا والمبادئ التوجيهية التشغيلية وفقًا للمعايير الإنسانية الدولية.',
          regulationsItems: [
            {
              title: 'النظام الأساسي للجمعية',
              description: 'اللائحة الداخلية واللوائح التنفيذية لجمعية الهلال الأحمر البحريني.',
              href: 'https://test.rcsbahrain.org/wp-content/uploads/2024/12/pdf-Bylaws-of-the-Association.pdf',
              label: 'المزيد',
            },
            {
              title: 'النظام الأساسي للجمعية',
              description: 'الوثيقة التأسيسية التي تحدد الإطار القانوني والمبادئ لمنظمتنا.',
              href: 'https://test.rcsbahrain.org/wp-content/uploads/2024/12/pdf-Statutes-of-the-association.pdf',
              label: 'المزيد',
            },
          ],
          regulationsNote:
            'إذا واجهتك مشكلة في الوصول إلى أي مستند، يرجى الاتصال بنا للحصول على المساعدة.',
        }
      : {
          eyebrow: 'About Bahrain Red Crescent Society',
          headline: 'Serving Humanity Since 1971',
          intro:
            'The Bahrain Red Crescent Society is a voluntary charitable organization established in 1971. It was internationally recognized on September 14, 1972 by the International Committee of the Red Cross in Geneva and joined the International Federation of Red Cross and Red Crescent Societies in the same year.',
          imageAlt: 'Photo from Bahrain Red Crescent Society activities',
          historyTitle: 'Society History',
          historyParagraphs: [
            'The first meeting of the founding committee was held at Manama Municipality Hall on January 28, 1970. The committee consisted of 24 founding members selected from prominent business leaders, merchants, and state employees.',
            'The society was formally established and registered with the competent government authorities, and its founding charter was issued by His Highness Sheikh Isa bin Salman Al Khalifa, the late Amir of Bahrain, on June 29, 1970. It received international recognition from the International Committee of the Red Cross and the International Federation of Red Cross and Red Crescent Societies on September 14, 1972, becoming member number 116 in the international movement.',
          ],
          missionTitle: 'Our Mission',
          missionItems: [
            {
              title: 'International Cooperation',
              description:
                'Contribute with our partners in the International Red Cross and Red Crescent Movement to alleviate human suffering.',
            },
            {
              title: 'Humanitarian Assistance',
              description:
                'Provide social and humanitarian services aligned with the Red Crescent mission.',
            },
            {
              title: 'Training and Education',
              description:
                'Promote the principles of the international movement, train and qualify volunteers in humanitarian work, support awareness of international humanitarian law, and provide services and aid to people in need.',
            },
          ],
          principlesTitle: 'Society Principles',
          principlesIntro:
            'The Bahrain Red Crescent Society seeks to fulfill the humanitarian goals of the International Red Cross both inside and outside Bahrain, in line with the principle of international humanitarian cooperation established by the Geneva Conventions and in accordance with the fundamental principles of Red Crescent and Red Cross societies:',
          principlesItems: [
            {
              title: 'Humanity',
              description:
                'Established to assist wounded soldiers on battlefields without discrimination, the Red Crescent strives to alleviate human suffering, protect human life, safeguard public health and human dignity, and strengthen understanding, friendship, and cooperation among peoples.',
            },
            {
              title: 'Impartiality',
              description:
                'The Red Crescent carries out its mission without discrimination based on nationality, race, religion, social status, or political belief, and extends help to all without distinction.',
            },
            {
              title: 'Neutrality',
              description:
                'The Red Crescent refrains from taking part in conflicts to preserve public trust and consistently avoids political, racial, religious, and ideological controversies.',
            },
            {
              title: 'Independence',
              description:
                'The Red Crescent is an independent organization. Although national societies support public authorities and are subject to national laws, they maintain autonomy to operate according to Red Cross and Red Crescent principles.',
            },
            {
              title: 'Voluntary Charity',
              description:
                'The Red Crescent is a charitable volunteer organization dedicated to rescue and relief and does not seek material gain.',
            },
            {
              title: 'Unity',
              description:
                'Only one national society may be established in each country; it is open to all and its humanitarian work covers the entire territory.',
            },
            {
              title: 'Universality',
              description:
                'The Red Crescent is part of a universal movement in which all societies have equal rights and share responsibilities of solidarity and cooperation.',
            },
          ],
          boardTitle: 'Board Members',
          boardIntro:
            'Our dedicated leadership team guides the mission of the Bahrain Red Crescent Society.',
          boardLeadership: [
            { name: 'H.E. Sheikh Mohammed bin Abdullah Al Khalifa', role: 'President' },
            { name: 'Mr. Ali bin Mohammed Murad', role: 'Vice President' },
            { name: 'Mr. Mubarak Khalifa Al Hadi', role: 'Secretary General' },
            { name: 'Mr. Hassan Ali Juma', role: 'Treasurer' },
          ],
          boardMembersTitle: 'Board Member',
          boardMembers: [
            'Dr. Fawzi Abdullah Amin',
            'Dr. Faisal Redha Al Mousawi',
            'Mr. Adel Hamad Al Jar',
            'Dr. Maryam Ibrahim Al Hajri',
            'Dr. Kawthar Mohammed Al Eid',
            'Dr. Niloufer Ahmed Jahrami',
          ],
          regulationsTitle: 'Society Regulations',
          regulationsIntro:
            'The official documents and bylaws that govern the Bahrain Red Crescent Society. These documents outline our organizational structure, governance, and operational guidance in line with international humanitarian standards.',
          regulationsItems: [
            {
              title: 'Association Bylaws',
              description: 'The internal bylaws and executive regulations of the Bahrain Red Crescent Society.',
              href: 'https://test.rcsbahrain.org/wp-content/uploads/2024/12/pdf-Bylaws-of-the-Association.pdf',
              label: 'More',
            },
            {
              title: 'Association Statutes',
              description: 'The foundational document defining the legal framework and principles of our organization.',
              href: 'https://test.rcsbahrain.org/wp-content/uploads/2024/12/pdf-Statutes-of-the-association.pdf',
              label: 'More',
            },
          ],
          regulationsNote:
            'If you have trouble accessing any document, please contact us for assistance.',
        };

  let cmsIntro: { title: string; content: string; excerpt: string | null } | null = null;

  try {
    const page = await getPageBySlug('about', locale);
    cmsIntro = {
      title: page.title,
      content: page.content,
      excerpt: page.excerpt,
    };
  } catch (error) {
    if (!(error instanceof ApiClientError)) {
      throw error;
    }
  }

  return (
    <>
      <section
        className="py-16 md:py-20 lg:py-24"
        style={{
          backgroundImage: "url('/backred.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-3xl bg-white/85 p-8 md:p-12 shadow-xl backdrop-blur-sm ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
            <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
              {locale === 'ar' ? 'من نحن' : 'About Us'}
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
              {cmsIntro?.title ?? dict.nav.about}
            </h1>
            <p className="mt-5 text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto lg:mx-0">
              {cmsIntro?.excerpt ?? dict.home.aboutPreview}
            </p>
          </div>
        </div>
      </section>

      <section
        className="py-16 md:py-20 lg:py-24"
        style={{
          backgroundImage: "url('/backgr.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 rounded-2xl bg-white/85 p-6 md:p-8 shadow-lg backdrop-blur-sm">
            <div>
              <SectionHeading title={cmsIntro?.title ?? dict.nav.about} centered={false} />
              {cmsIntro ? (
                <CmsContent content={cmsIntro.content} className="mt-4" />
              ) : (
                <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                  {aboutNarrative.intro}
                </p>
              )}
            </div>

            <div
              id="history"
              className="space-y-6 scroll-mt-40 rounded-2xl border border-white/60 p-6 md:p-8 shadow-lg"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.88), rgba(255,255,255,0.88)), url('/backred.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
                {aboutNarrative.eyebrow}
              </p>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {aboutNarrative.headline}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">{aboutNarrative.intro}</p>
              <img
                src="https://rcsbahrain.org/wp-content/uploads/2024/12/2-1024x682.jpeg"
                alt={aboutNarrative.imageAlt}
                className="w-full rounded-xl border border-gray-200 object-cover"
                loading="lazy"
              />
            </div>

            <div
              id="history-section"
              className="scroll-mt-40 rounded-2xl border border-white/60 bg-white/85 p-6 md:p-8 shadow-lg"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.88), rgba(255,255,255,0.88)), url('/backbage.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <SectionHeading title={aboutNarrative.historyTitle} centered={false} />
              <div className="space-y-4 mt-4 text-lg text-gray-700 leading-relaxed">
                {aboutNarrative.historyParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading title={aboutNarrative.missionTitle} centered={false} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {aboutNarrative.missionItems.map((item) => (
                  <div
                    key={item.title}
                    className="bg-white p-6 rounded-lg border border-gray-200 hover:border-red-700 hover:shadow-md transition-all"
                  >
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="principles" className="scroll-mt-40">
              <SectionHeading title={aboutNarrative.principlesTitle} centered={false} />
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                {aboutNarrative.principlesIntro}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {aboutNarrative.principlesItems.map((item) => (
                  <div
                    key={item.title}
                    className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-red-700 hover:shadow-md transition-all"
                  >
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="board-members" className="scroll-mt-40">
              <SectionHeading title={aboutNarrative.boardTitle} centered={false} />
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                {aboutNarrative.boardIntro}
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {aboutNarrative.boardLeadership.map((leader) => (
                  <div
                    key={leader.name}
                    className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="text-xl font-bold text-gray-900">{leader.name}</h3>
                    <p className="mt-2 text-sm font-semibold text-red-700">{leader.role}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
                <h3 className="text-lg font-bold text-gray-900">{aboutNarrative.boardMembersTitle}</h3>
                <ul className="mt-4 space-y-2 text-gray-700">
                  {aboutNarrative.boardMembers.map((member) => (
                    <li key={member} className="leading-relaxed">
                      {member}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div id="regulations" className="scroll-mt-40">
              <SectionHeading title={aboutNarrative.regulationsTitle} centered={false} />
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                {aboutNarrative.regulationsIntro}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-6">
                {aboutNarrative.regulationsItems.map((item) => (
                  <article
                    key={item.href}
                    className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                    <p className="mt-3 text-gray-600 leading-relaxed">{item.description}</p>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                    >
                      {item.label}
                    </a>
                  </article>
                ))}
              </div>

              <p className="mt-6 text-sm text-gray-500">{aboutNarrative.regulationsNote}</p>
            </div>

            <div>
              <SectionHeading
                title={locale === 'ar' ? 'من نحن' : 'About Our Organization'}
                centered={false}
              />
              <p className="text-lg text-gray-600 leading-relaxed mt-4">{dict.org.description}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
