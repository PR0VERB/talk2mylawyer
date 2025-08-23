import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';

const roles = [
  'Client',
  'Lawyer',
  'Law Firm Admin',
  'Partner',
  'Investor',
  'Press/Media',
  'Other',
] as const;


const reasons = [
  'Early access',
  'Partnership',
  'Investment',
  'Media inquiry',
  'Hiring/Staffing',
  'Other',
] as const;


const schema = yup.object({
  roles: yup.array().of(yup.string().oneOf(roles as unknown as string[])).min(1, 'Please select at least one role').required(),
  primary_reason: yup.string().oneOf(reasons as unknown as string[]).required('Please select a reason'),
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  email: yup.string().email('Enter a valid work email').required('Email is required'),
  country: yup.string().required('Country/Region is required'),
  city: yup.string().required('City is required'),
  consent: yup.boolean().oneOf([true], 'Consent is required'),

});

export type FormValues = yup.InferType<typeof schema>;

export default function LandingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const hasSupabase = Boolean(supabase);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
    mode: 'onBlur',
    defaultValues: {
      roles: [],
      primary_reason: undefined as any,
      first_name: '',
      last_name: '',
      email: '',
      country: '',
      city: '',
      consent: false,

    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      if (!supabase) throw new Error('Supabase not configured');
      const { error } = await supabase.from('interest_submissions').insert({
        roles: values.roles,
        primary_reason: values.primary_reason,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        country: values.country,
        city: values.city,
        consent: values.consent,

        meta: { userAgent: navigator.userAgent },
      });
      if (error) throw error;
      toast.success('Thanks! We will be in touch.', { icon: '✅' });
      setSubmitted(true);
    } catch (e: any) {
      console.error(e);
      const message = e?.message || 'Unexpected error. Please try again later.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const sectionAnim = useMemo(() => ({ initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } }), []);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 flex items-start gap-4">
            <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Submission received</h2>
              <p className="mt-2 text-gray-700">Thank you for your interest in Talk2MyLawyer. We’ll send communication on updates and app launch.</p>
            </div>
          </Card>
        </div>
        <Toaster position="top-right" toastOptions={{
          success: { style: { background: '#10B981', color: 'white' } },
          error: { style: { background: '#EF4444', color: 'white' } },
        }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="border-b border-sky-100/70 bg-white/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Talk2MyLawyer</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <motion.section {...sectionAnim}>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">Tell us about your interest</h2>
            <p className="mt-2 text-gray-700">We use this information to get you the right early access, partnerships, and updates.</p>
          </div>
        </motion.section>

        <motion.section {...sectionAnim} className="mt-6">
          <Card className="p-6 ring-1 ring-sky-100/60">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Role and Intent */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Role and Intent</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role (select all that apply)</label>
                    <div className="grid grid-cols-2 gap-3">
                      {loading ? (
                        <>
                          <Skeleton className="h-10 w-full" />
                          <Skeleton className="h-10 w-full" />
                          <Skeleton className="h-10 w-full" />
                          <Skeleton className="h-10 w-full" />
                        </>
                      ) : (
                        roles.map((role) => (
                          <label key={role} className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200">
                            <input type="checkbox" value={role} {...register('roles')} className="h-4 w-4 text-sky-500 focus:ring-sky-500 rounded" />
                            <span className="text-sm text-gray-700">{role}</span>
                          </label>
                        ))
                      )}
                    </div>
                    {errors.roles && <p className="mt-1 text-sm text-red-600">{errors.roles.message as string}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary reason for interest</label>
                    {loading ? (
                      <Skeleton className="h-[52px] w-full" />
                    ) : (
                      <select
                        className="block w-full px-4 py-3 border rounded-xl text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                        defaultValue=""
                        {...register('primary_reason')}
                      >
                        <option value="" disabled>
                          Select a reason
                        </option>
                        {reasons.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    )}
                    {errors.primary_reason && <p className="mt-1 text-sm text-red-600">{errors.primary_reason.message as string}</p>}
                  </div>
                </div>

              </div>

              {/* Contact Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Contact Details</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {loading ? (
                    <>
                      <Skeleton className="h-[74px] w-full" />
                      <Skeleton className="h-[74px] w-full" />
                      <Skeleton className="h-[74px] w-full" />
                    </>
                  ) : (
                    <>
                      <Input label="First name" placeholder="Jane" {...register('first_name')} error={errors.first_name?.message} />
                      <Input label="Last name" placeholder="Doe" {...register('last_name')} error={errors.last_name?.message} />
                      <Input label="Work email" type="email" placeholder="jane@company.com" {...register('email')} error={errors.email?.message} />
                      <Input label="Country/Region" placeholder="United States" {...register('country')} error={errors.country?.message} />
                      <Input label="City" placeholder="San Francisco" {...register('city')} error={errors.city?.message} />
                    </>
                  )}
                </div>
              </div>

              {/* Preferences & Compliance */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Preferences & Compliance</h3>
                <label className="flex items-start gap-3">
                  <input type="checkbox" {...register('consent')} className="mt-1 h-4 w-4 text-sky-500 focus:ring-sky-500 rounded" />
                  <span className="text-sm text-gray-700">I consent to be contacted regarding updates and the launch of Talk2MyLawyer.</span>
                </label>
                {errors.consent && <p className="text-sm text-red-600">{errors.consent.message as string}</p>}

              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                {/* <p className="text-sm text-gray-500">We respect your privacy and do not collect sensitive information.</p> */}
                {loading ? (
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-28" />
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Button type="submit" loading={loading} disabled={!isValid || !hasSupabase}>
                      Submit
                    </Button>
                    {!hasSupabase && (
                      <span className="text-sm text-gray-500">Setup required: add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env</span>
                    )}
                  </div>
                )}
              </div>
            </form>
          </Card>
        </motion.section>
      </main>

      <Toaster position="top-right" toastOptions={{
        success: { style: { background: '#10B981', color: 'white' } },
        error: { style: { background: '#EF4444', color: 'white' } },
      }} />
    </div>
  );
}

