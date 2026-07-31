import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import type { Category, Choice, Question } from '../../types';

// フォーム上で扱う入力値の型（choices はまだ id を持たない4つの文字列）
type QuestionFormValues = {
  text: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  correctIndex: '1' | '2' | '3' | '4';
  explanation: string;
  timeLimitSec: number;
  category: Category;
};

const schema: yup.ObjectSchema<QuestionFormValues> = yup.object({
  text: yup
    .string()
    .transform((value: string) => value?.trim())
    .required('問題文は5文字以上で入力してください。')
    .min(5, '問題文は5文字以上で入力してください。')
    .max(200, '問題文は200文字以内で入力してください。'),

  choice1: yup
    .string()
    .transform((value: string) => value?.trim())
    .required('選択肢を入力してください。')
    .max(60, '選択肢は60文字以内で入力してください。'),
  choice2: yup
    .string()
    .transform((value: string) => value?.trim())
    .required('選択肢を入力してください。')
    .max(60, '選択肢は60文字以内で入力してください。'),
  choice3: yup
    .string()
    .transform((value: string) => value?.trim())
    .required('選択肢を入力してください。')
    .max(60, '選択肢は60文字以内で入力してください。'),
  choice4: yup
    .string()
    .transform((value: string) => value?.trim())
    .required('選択肢を入力してください。')
    .max(60, '選択肢は60文字以内で入力してください。')
    // 独自 test: 4つの選択肢に重複があってはならない
    .test('no-duplicate-choices', '選択肢が重複しています。', function noDuplicateChoices(value) {
      const { choice1, choice2, choice3 } = this.parent as QuestionFormValues;
      const all = [choice1, choice2, choice3, value];
      const unique = new Set(all.filter(Boolean));
      return unique.size === all.filter(Boolean).length;
    }),

  correctIndex: yup
    .mixed<'1' | '2' | '3' | '4'>()
    .oneOf(['1', '2', '3', '4'], '正解を選択してください。')
    .required('正解を選択してください。'),

  explanation: yup
    .string()
    .transform((value: string) => value?.trim())
    .required('解説は10文字以上で入力してください。')
    .min(10, '解説は10文字以上で入力してください。'),

  timeLimitSec: yup
    .number()
    .typeError('制限時間は5〜120秒で入力してください。')
    .integer('制限時間は5〜120秒で入力してください。')
    .min(5, '制限時間は5〜120秒で入力してください。')
    .max(120, '制限時間は5〜120秒で入力してください。')
    .required('制限時間は5〜120秒で入力してください。'),

  category: yup
    .mixed<Category>()
    .oneOf(['JavaScript', 'TypeScript', 'React'], 'カテゴリを正しく選択してください。')
    .required('カテゴリを正しく選択してください。'),
});

type QuestionFormProps = {
  onAdd: (question: Question) => void;
};

export function QuestionForm({ onAdd }: QuestionFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuestionFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      timeLimitSec: 30,
      category: 'JavaScript',
    },
  });

  const onSubmit = (values: QuestionFormValues) => {
    const choices: Choice[] = [
      { id: crypto.randomUUID(), label: values.choice1 },
      { id: crypto.randomUUID(), label: values.choice2 },
      { id: crypto.randomUUID(), label: values.choice3 },
      { id: crypto.randomUUID(), label: values.choice4 },
    ];
    const correctChoiceId = choices[Number(values.correctIndex) - 1].id;

    const question: Question = {
      id: crypto.randomUUID(),
      text: values.text,
      choices,
      correctChoiceId,
      explanation: values.explanation,
      timeLimitSec: values.timeLimitSec,
      category: values.category,
    };

    onAdd(question);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          問題文
          <input type="text" {...register('text')} />
        </label>
        {errors.text && <p style={{ color: 'red' }}>{errors.text.message}</p>}
      </div>

      {(['choice1', 'choice2', 'choice3', 'choice4'] as const).map((name, i) => (
        <div key={name}>
          <label>
            選択肢{i + 1}
            <input type="text" {...register(name)} />
          </label>
          {errors[name] && <p style={{ color: 'red' }}>{errors[name]?.message}</p>}
        </div>
      ))}

      <div>
        <span>正解</span>
        {(['1', '2', '3', '4'] as const).map((value) => (
          <label key={value} style={{ marginRight: 8 }}>
            <input type="radio" value={value} {...register('correctIndex')} />
            {value}
          </label>
        ))}
        {errors.correctIndex && <p style={{ color: 'red' }}>{errors.correctIndex.message}</p>}
      </div>

      <div>
        <label>
          解説
          <textarea {...register('explanation')} />
        </label>
        {errors.explanation && <p style={{ color: 'red' }}>{errors.explanation.message}</p>}
      </div>

      <div>
        <label>
          制限時間（秒）
          <input type="number" {...register('timeLimitSec')} />
        </label>
        {errors.timeLimitSec && <p style={{ color: 'red' }}>{errors.timeLimitSec.message}</p>}
      </div>

      <div>
        <label>
          カテゴリ
          <select {...register('category')}>
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
            <option value="React">React</option>
          </select>
        </label>
        {errors.category && <p style={{ color: 'red' }}>{errors.category.message}</p>}
      </div>

      <button type="submit">登録する</button>
    </form>
  );
}
