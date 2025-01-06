import Link from "next/link";
import Image from "next/image";
import { ResultCommingAlertDialog } from "@/components/Result-comming-soon-dialog";
import ContactPage from "@/components/contact-us";

export default async function Home() {
  return (
    <>
      <section className="flex flex-col items-center gap-6 bg-sky-50 px-4 py-20 dark:bg-sky-900 md:px-10 lg:flex-row">
        <div className="flex flex-col gap-6">
          <h2 className="text-center text-4xl font-extrabold text-slate-900 dark:text-white md:text-5xl lg:text-left lg:text-7xl">
            MATHEMATICS APTITUTE TEST 2025
          </h2>
          <p className="max-w-prose text-center md:text-lg lg:text-left lg:text-xl">
            MAT-2025 is a mathematics entrance test focused on enhancing
            problem-solving and analytical skills. It covers key topics like
            algebra, calculus, geometry, and logical reasoning. The exam aims to
            boost mathematical aptitude for academic and professional growth.
          </p>
          <div className="flex w-full flex-col gap-4">
            <Link
              href="/questions"
              className="rounded-xl bg-sky-500 p-3 text-center font-semibold text-white hover:bg-sky-600 active:bg-sky-700 dark:bg-sky-400 dark:text-sky-950 dark:hover:bg-sky-300 dark:active:bg-sky-500"
            >
              Explore Past Questions
            </Link>
            <ResultCommingAlertDialog />
          </div>
        </div>
        <Image
          src="/math1.png"
          alt="A girl holding a book in her hands while surrounded by other books, looking at a spaceship flying into the air"
          width={1664}
          height={1117}
          priority
          className="lg:w-6/12"
        />
      </section>
      <section
        id="discover-examshare"
        className="flex flex-col items-center gap-7 px-4 py-14 md:px-10 lg:flex-row"
      >
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Discover MAT
          </h2>
          <div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                {/* <FaRegCompass size={25} /> */}
                <h3 className="text-xl">Past Goldmines</h3>
              </div>
              <p className="ml-3 max-w-prose border-l border-sky-200 px-5 pb-6 pt-2 dark:border-sky-700">
                There is nothing new under the sun. Explore questions from
                earlier years and beyond, Officially provided by the exam
                authorities to help you to enhance your exam preparation with
                authentic and reliable resources.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                {/* <LiaUsersSolid size={25} /> */}
                <h3 className="text-xl">Boost Learning</h3>
              </div>
              <p className="ml-3 max-w-prose border-l border-sky-200 px-5 pb-6 pt-2 dark:border-sky-700">
                Unlock the potential of collaborative learning. Share, discuss,
                and learn from others answers to these past examination
                questions.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                {/* <BsGlobe size={25} /> */}
                <h3 className="text-xl">Help The Future</h3>
              </div>
              <p className="ml-3 max-w-prose px-5 pb-6 pt-2">
                Invest in your own bright future by dedicating time to learning
                and growth. Every effort you make today brings you one step
                closer to achieving your dreams and unlocking your true
                potential.
              </p>
            </div>
          </div>
        </div>
        <Image
          src="/math3.avif"
          alt="A young man sitting and extending his hands to assist a young girl who is falling on the ground and reaching out for help"
          width={1664}
          height={1117}
          priority
          className="lg:w-5/12"
        />
      </section>
      <section className="flex flex-col gap-6 bg-sky-50 px-4 py-14 dark:bg-sky-900 md:px-10">
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-400 to-sky-600 p-12 text-white dark:from-sky-300 dark:to-sky-500 dark:text-sky-950">
          <h3 className="text-4xl font-extrabold">100+</h3>
          <p className="text-3xl font-medium">Institutions</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-400 to-sky-600 p-12 text-white dark:from-sky-300 dark:to-sky-500 dark:text-sky-950">
          <h3 className="text-4xl font-extrabold">2000+</h3>
          <p className="text-3xl font-medium">Students</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-400 to-sky-600 p-12 text-white dark:from-sky-300 dark:to-sky-500 dark:text-sky-950">
          <h3 className="text-4xl font-extrabold">10+</h3>
          <p className="text-3xl font-medium">Centers</p>
        </div>
      </section>
      <section
        id="faqs"
        className="flex flex-col items-center gap-7 px-4 py-14 md:px-10 lg:flex-row"
      >
        <Image
          src="/faq.svg"
          alt=""
          width={1000}
          height={659}
          className="lg:w-5/12"
        />
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="mb-2 max-w-prose font-medium text-slate-900 dark:text-white">
                How can I view the past exam questions for my school?
              </h3>
              <p className="max-w-prose text-sm">
                To access past exam questions for your class, go to the
                <Link
                  href="/questions"
                  className="font-bold text-sky-500 hover:text-slate-400 hover:underline hover:decoration-sky-500 hover:underline-offset-4"
                >
                  {" "}
                  past questions archive page{" "}
                </Link>
                and locate your class and click a year ,you will be directed to
                a dedicated section displaying the <strong>
                  available
                </strong>{" "}
                past questions for your class. If there are no past questions
                available for your class, you will be redirected to a 404 error
                page.
              </p>
            </div>
            <div>
              <h3 className="mb-2 max-w-prose font-medium text-slate-900 dark:text-white">
                How can I check result?
              </h3>
              <p className="max-w-prose text-sm">
                To check your result, go to the
                <Link
                  href="/"
                  className="font-bold text-sky-500 hover:text-slate-400 hover:underline hover:decoration-sky-500 hover:underline-offset-4"
                >
                  {" "}
                  result page{" "}
                </Link>
                and input your Roll Number and click the check button. You will
                be redirected to a dedicated section displaying your result.
              </p>
            </div>
            <div>
              <h3 className="mb-2 max-w-prose font-medium text-slate-900 dark:text-white">
                When are the results usually released?
              </h3>
              <p className="max-w-prose text-sm">
                The results are usually released within 7 days after the
                examination. You can check the result page to see if your result
                has been released.
              </p>
            </div>
            <div>
              <h3 className="mb-2 max-w-prose font-medium text-slate-900 dark:text-white">
                How many questions are available for each class?
              </h3>
              <p className="max-w-prose text-sm">
                <strong>25</strong> questions are available for each class.
              </p>
            </div>
            <div>
              <h3 className="mb-2 max-w-prose font-medium text-slate-900 dark:text-white">
                Will extra time be given for reading questions and filling the
                roll number and name...?
              </h3>
              <p className="max-w-prose text-sm">Yes</p>
            </div>
          </div>
        </div>
      </section>
      <ContactPage />
    </>
  );
}
