// Tipos necessários para os planos de treino
export type WorkoutType = 'walk_run' | 'easy_run' | 'progressive' | 'interval' | 'tempo' | 'long_run' | 'fartlek' | 'hill_repeats' | 'recovery_run'

export type WorkoutBlock = {
  type: 'warmup' | 'main' | 'cooldown' | 'run' | 'walk' | 'rest'
  duration: number // em minutos
  intensity?: string
  description?: string
  distance?: number // em km
  pace?: string // min/km
}

export type Workout = {
  id: string
  name: string
  type: WorkoutType
  description: string
  totalDuration: number // em minutos
  blocks: WorkoutBlock[]
  benefits: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export type TrainingPlan = {
  id: string
  name: string
  trainer: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  goal: string
  durationWeeks: number
  daysPerWeek: number
  weeks: {
    weekNumber: number
    focus: string
    workouts: Workout[]
  }[]
}

// Interface do questionário (anamnese)
export interface AnamneseData {
  nivelAtividade: 'sedentario' | 'iniciante' | 'intermediario_leve'
  diasDisponiveis: string[] // ['segunda', 'quarta', 'sexta']
  objetivoPrincipal: 'prova' | 'condicionamento' | 'correr_sem_parar' | 'aumentar_distancia' | 'consistencia'
  distanciaAlvo?: string // '5km', '10km', etc
  dataProva?: string // ISO date string
  lesaoRecente?: 'sim' | 'nao'
  dorAtual?: 'sim' | 'nao'
  jaCorreuAntes?: 'sim' | 'nao'
  maiorDistancia?: string
}

// Biblioteca de treinos base
const WORKOUTS_LIBRARY: Record<WorkoutType, Workout[]> = {
  walk_run: [
    {
      id: 'walk-run-1',
      name: 'Caminhada + Corrida Leve',
      type: 'walk_run',
      description: 'Alternância entre caminhada e corrida para adaptação inicial',
      totalDuration: 20,
      blocks: [
        { type: 'warmup', duration: 3, description: 'Caminhada de aquecimento' },
        { type: 'run', duration: 1, intensity: 'easy', description: 'Corrida leve' },
        { type: 'walk', duration: 2, description: 'Caminhada de recuperação' },
        { type: 'run', duration: 1, intensity: 'easy' },
        { type: 'walk', duration: 2 },
        { type: 'run', duration: 1, intensity: 'easy' },
        { type: 'walk', duration: 2 },
        { type: 'run', duration: 1, intensity: 'easy' },
        { type: 'walk', duration: 2 },
        { type: 'cooldown', duration: 5, description: 'Caminhada de resfriamento' }
      ],
      benefits: ['Adaptação ao movimento', 'Desenvolvimento inicial'],
      difficulty: 'beginner'
    }
  ],
  easy_run: [
    {
      id: 'easy-run-1',
      name: 'Corrida Leve',
      type: 'easy_run',
      description: 'Corrida confortável em ritmo conversível',
      totalDuration: 30,
      blocks: [
        { type: 'warmup', duration: 5, description: 'Aquecimento leve' },
        { type: 'run', duration: 20, intensity: 'easy', description: 'Corrida leve e conversível' },
        { type: 'cooldown', duration: 5, description: 'Resfriamento' }
      ],
      benefits: ['Desenvolvimento aeróbico', 'Recuperação ativa'],
      difficulty: 'beginner'
    }
  ],
  progressive: [
    {
      id: 'progressive-1',
      name: 'Treino Progressivo',
      type: 'progressive',
      description: 'Corrida com aumento gradual de intensidade',
      totalDuration: 35,
      blocks: [
        { type: 'warmup', duration: 5, description: 'Aquecimento' },
        { type: 'run', duration: 10, intensity: 'easy', description: 'Início leve' },
        { type: 'run', duration: 10, intensity: 'moderate', description: 'Ritmo moderado' },
        { type: 'run', duration: 5, intensity: 'tempo', description: 'Finalização forte' },
        { type: 'cooldown', duration: 5, description: 'Resfriamento' }
      ],
      benefits: ['Controle de ritmo', 'Resistência progressiva'],
      difficulty: 'intermediate'
    }
  ],
  interval: [
    {
      id: 'interval-1',
      name: 'Intervalado Leve',
      type: 'interval',
      description: 'Treino com alternância de intensidade',
      totalDuration: 35,
      blocks: [
        { type: 'warmup', duration: 5, description: 'Aquecimento' },
        { type: 'run', duration: 2, intensity: 'moderate', description: 'Corrida moderada' },
        { type: 'walk', duration: 1, description: 'Recuperação caminhando' },
        { type: 'run', duration: 2, intensity: 'moderate' },
        { type: 'walk', duration: 1 },
        { type: 'run', duration: 2, intensity: 'moderate' },
        { type: 'walk', duration: 1 },
        { type: 'run', duration: 2, intensity: 'moderate' },
        { type: 'walk', duration: 1 },
        { type: 'cooldown', duration: 5, description: 'Resfriamento' }
      ],
      benefits: ['Melhoria da velocidade', 'Capacidade cardiovascular'],
      difficulty: 'intermediate'
    }
  ],
  tempo: [
    {
      id: 'tempo-1',
      name: 'Treino de Ritmo',
      type: 'tempo',
      description: 'Corrida mantida em ritmo constante e desafiador',
      totalDuration: 40,
      blocks: [
        { type: 'warmup', duration: 5 },
        { type: 'run', duration: 30, intensity: 'tempo', description: 'Ritmo constante' },
        { type: 'cooldown', duration: 5 }
      ],
      benefits: ['Resistência', 'Controle de ritmo'],
      difficulty: 'intermediate'
    }
  ],
  long_run: [
    {
      id: 'long-run-1',
      name: 'Longão',
      type: 'long_run',
      description: 'Corrida de longa duração em ritmo confortável',
      totalDuration: 60,
      blocks: [
        { type: 'warmup', duration: 5 },
        { type: 'run', duration: 50, intensity: 'easy', description: 'Corrida longa e confortável' },
        { type: 'cooldown', duration: 5 }
      ],
      benefits: ['Resistência muscular', 'Capacidade aeróbica'],
      difficulty: 'intermediate'
    }
  ],
  fartlek: [
    {
      id: 'fartlek-1',
      name: 'Fartlek',
      type: 'fartlek',
      description: 'Treino de velocidade variável',
      totalDuration: 35,
      blocks: [
        { type: 'warmup', duration: 5 },
        { type: 'run', duration: 3, intensity: 'easy' },
        { type: 'run', duration: 1, intensity: 'fast', description: 'Aceleração' },
        { type: 'run', duration: 3, intensity: 'easy' },
        { type: 'run', duration: 1, intensity: 'fast' },
        { type: 'run', duration: 3, intensity: 'easy' },
        { type: 'cooldown', duration: 5 }
      ],
      benefits: ['Velocidade', 'Variabilidade'],
      difficulty: 'intermediate'
    }
  ],
  hill_repeats: [
    {
      id: 'hill-repeats-1',
      name: 'Subidas',
      type: 'hill_repeats',
      description: 'Repetições de subida para força muscular',
      totalDuration: 40,
      blocks: [
        { type: 'warmup', duration: 5 },
        { type: 'run', duration: 2, intensity: 'moderate', description: 'Subida forte' },
        { type: 'walk', duration: 2, description: 'Descida caminhando' },
        { type: 'run', duration: 2, intensity: 'moderate' },
        { type: 'walk', duration: 2 },
        { type: 'cooldown', duration: 5 }
      ],
      benefits: ['Força muscular', 'Técnica de corrida'],
      difficulty: 'advanced'
    }
  ],
  recovery_run: [
    {
      id: 'recovery-1',
      name: 'Recuperação Ativa',
      type: 'recovery_run',
      description: 'Corrida muito leve para recuperação',
      totalDuration: 25,
      blocks: [
        { type: 'warmup', duration: 5 },
        { type: 'run', duration: 15, intensity: 'very_easy', description: 'Corrida muito leve' },
        { type: 'cooldown', duration: 5 }
      ],
      benefits: ['Recuperação ativa', 'Manutenção do hábito'],
      difficulty: 'beginner'
    }
  ]
}

/**
 * Planos de treino pré-definidos para a biblioteca
 */
export const TRAINING_PLANS: TrainingPlan[] = [
  {
    id: 'beginner-5k',
    name: 'Iniciante 5K',
    trainer: 'Run Easy',
    description: 'Plano ideal para quem está começando e quer completar seus primeiros 5km',
    level: 'beginner',
    goal: '5km',
    durationWeeks: 8,
    daysPerWeek: 3,
    weeks: Array.from({ length: 8 }, (_, i) => ({
      weekNumber: i + 1,
      focus: i < 3 ? 'Adaptação' : i < 6 ? 'Construção' : 'Consolidação',
      workouts: [
        {
          id: `beginner-5k-w${i + 1}-d1`,
          name: 'Caminhada + Corrida',
          type: 'walk_run' as WorkoutType,
          description: 'Alternância entre caminhada e corrida',
          totalDuration: 20 + i * 2,
          blocks: [],
          benefits: ['Adaptação', 'Desenvolvimento'],
          difficulty: 'beginner' as const
        },
        {
          id: `beginner-5k-w${i + 1}-d2`,
          name: 'Corrida Leve',
          type: 'easy_run' as WorkoutType,
          description: 'Corrida confortável',
          totalDuration: 25 + i * 2,
          blocks: [],
          benefits: ['Resistência', 'Condicionamento'],
          difficulty: 'beginner' as const
        },
        {
          id: `beginner-5k-w${i + 1}-d3`,
          name: 'Corrida Progressiva',
          type: 'progressive' as WorkoutType,
          description: 'Aumento gradual de intensidade',
          totalDuration: 30 + i * 2,
          blocks: [],
          benefits: ['Controle de ritmo', 'Evolução'],
          difficulty: 'beginner' as const
        }
      ]
    }))
  },
  {
    id: 'intermediate-10k',
    name: 'Intermediário 10K',
    trainer: 'Run Easy',
    description: 'Para corredores que já têm base e querem evoluir para 10km',
    level: 'intermediate',
    goal: '10km',
    durationWeeks: 12,
    daysPerWeek: 4,
    weeks: Array.from({ length: 12 }, (_, i) => ({
      weekNumber: i + 1,
      focus: i < 4 ? 'Base' : i < 8 ? 'Construção' : 'Qualidade',
      workouts: [
        {
          id: `intermediate-10k-w${i + 1}-d1`,
          name: 'Corrida Leve',
          type: 'easy_run' as WorkoutType,
          description: 'Corrida confortável',
          totalDuration: 30 + i * 2,
          blocks: [],
          benefits: ['Resistência aeróbica'],
          difficulty: 'intermediate' as const
        },
        {
          id: `intermediate-10k-w${i + 1}-d2`,
          name: 'Intervalado',
          type: 'interval' as WorkoutType,
          description: 'Treino de velocidade',
          totalDuration: 35 + i * 2,
          blocks: [],
          benefits: ['Velocidade', 'VO2max'],
          difficulty: 'intermediate' as const
        },
        {
          id: `intermediate-10k-w${i + 1}-d3`,
          name: 'Treino de Ritmo',
          type: 'tempo' as WorkoutType,
          description: 'Ritmo constante',
          totalDuration: 40 + i * 2,
          blocks: [],
          benefits: ['Limiar anaeróbico'],
          difficulty: 'intermediate' as const
        },
        {
          id: `intermediate-10k-w${i + 1}-d4`,
          name: 'Corrida Longa',
          type: 'long_run' as WorkoutType,
          description: 'Treino de resistência',
          totalDuration: 50 + i * 3,
          blocks: [],
          benefits: ['Resistência muscular'],
          difficulty: 'intermediate' as const
        }
      ]
    }))
  },
  {
    id: 'advanced-half-marathon',
    name: 'Avançado Meia Maratona',
    trainer: 'Run Easy',
    description: 'Plano completo para corredores experientes que buscam a meia maratona',
    level: 'advanced',
    goal: '21km',
    durationWeeks: 16,
    daysPerWeek: 5,
    weeks: Array.from({ length: 16 }, (_, i) => ({
      weekNumber: i + 1,
      focus: i < 5 ? 'Base' : i < 10 ? 'Construção' : i < 14 ? 'Qualidade' : 'Taper',
      workouts: [
        {
          id: `advanced-half-w${i + 1}-d1`,
          name: 'Corrida Leve',
          type: 'easy_run' as WorkoutType,
          description: 'Recuperação ativa',
          totalDuration: 40 + i * 2,
          blocks: [],
          benefits: ['Recuperação', 'Volume'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d2`,
          name: 'Intervalado',
          type: 'interval' as WorkoutType,
          description: 'Treino de velocidade',
          totalDuration: 45 + i * 2,
          blocks: [],
          benefits: ['Velocidade', 'Potência'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d3`,
          name: 'Tempo Run',
          type: 'tempo' as WorkoutType,
          description: 'Ritmo de prova',
          totalDuration: 50 + i * 2,
          blocks: [],
          benefits: ['Limiar', 'Ritmo'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d4`,
          name: 'Fartlek',
          type: 'fartlek' as WorkoutType,
          description: 'Velocidade variável',
          totalDuration: 45 + i * 2,
          blocks: [],
          benefits: ['Variabilidade', 'Diversão'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d5`,
          name: 'Longão',
          type: 'long_run' as WorkoutType,
          description: 'Treino longo',
          totalDuration: 60 + i * 4,
          blocks: [],
          benefits: ['Resistência', 'Adaptação'],
          difficulty: 'advanced' as const
        }
      ]
    }))
  }
]

/**
 * Planos de treino pré-definidos para a biblioteca
 */
export const TRAINING_PLANS: TrainingPlan[] = [
  {
    id: 'beginner-5k',
    name: 'Iniciante 5K',
    trainer: 'Run Easy',
    description: 'Plano ideal para quem está começando e quer completar seus primeiros 5km',
    level: 'beginner',
    goal: '5km',
    durationWeeks: 8,
    daysPerWeek: 3,
    weeks: Array.from({ length: 8 }, (_, i) => ({
      weekNumber: i + 1,
      focus: i < 3 ? 'Adaptação' : i < 6 ? 'Construção' : 'Consolidação',
      workouts: [
        {
          id: `beginner-5k-w${i + 1}-d1`,
          name: 'Caminhada + Corrida',
          type: 'walk_run' as WorkoutType,
          description: 'Alternância entre caminhada e corrida',
          totalDuration: 20 + i * 2,
          blocks: [],
          benefits: ['Adaptação', 'Desenvolvimento'],
          difficulty: 'beginner' as const
        },
        {
          id: `beginner-5k-w${i + 1}-d2`,
          name: 'Corrida Leve',
          type: 'easy_run' as WorkoutType,
          description: 'Corrida confortável',
          totalDuration: 25 + i * 2,
          blocks: [],
          benefits: ['Resistência', 'Condicionamento'],
          difficulty: 'beginner' as const
        },
        {
          id: `beginner-5k-w${i + 1}-d3`,
          name: 'Corrida Progressiva',
          type: 'progressive' as WorkoutType,
          description: 'Aumento gradual de intensidade',
          totalDuration: 30 + i * 2,
          blocks: [],
          benefits: ['Controle de ritmo', 'Evolução'],
          difficulty: 'beginner' as const
        }
      ]
    }))
  },
  {
    id: 'intermediate-10k',
    name: 'Intermediário 10K',
    trainer: 'Run Easy',
    description: 'Para corredores que já têm base e querem evoluir para 10km',
    level: 'intermediate',
    goal: '10km',
    durationWeeks: 12,
    daysPerWeek: 4,
    weeks: Array.from({ length: 12 }, (_, i) => ({
      weekNumber: i + 1,
      focus: i < 4 ? 'Base' : i < 8 ? 'Construção' : 'Qualidade',
      workouts: [
        {
          id: `intermediate-10k-w${i + 1}-d1`,
          name: 'Corrida Leve',
          type: 'easy_run' as WorkoutType,
          description: 'Corrida confortável',
          totalDuration: 30 + i * 2,
          blocks: [],
          benefits: ['Resistência aeróbica'],
          difficulty: 'intermediate' as const
        },
        {
          id: `intermediate-10k-w${i + 1}-d2`,
          name: 'Intervalado',
          type: 'interval' as WorkoutType,
          description: 'Treino de velocidade',
          totalDuration: 35 + i * 2,
          blocks: [],
          benefits: ['Velocidade', 'VO2max'],
          difficulty: 'intermediate' as const
        },
        {
          id: `intermediate-10k-w${i + 1}-d3`,
          name: 'Treino de Ritmo',
          type: 'tempo' as WorkoutType,
          description: 'Ritmo constante',
          totalDuration: 40 + i * 2,
          blocks: [],
          benefits: ['Limiar anaeróbico'],
          difficulty: 'intermediate' as const
        },
        {
          id: `intermediate-10k-w${i + 1}-d4`,
          name: 'Corrida Longa',
          type: 'long_run' as WorkoutType,
          description: 'Treino de resistência',
          totalDuration: 50 + i * 3,
          blocks: [],
          benefits: ['Resistência muscular'],
          difficulty: 'intermediate' as const
        }
      ]
    }))
  },
  {
    id: 'advanced-half-marathon',
    name: 'Avançado Meia Maratona',
    trainer: 'Run Easy',
    description: 'Plano completo para corredores experientes que buscam a meia maratona',
    level: 'advanced',
    goal: '21km',
    durationWeeks: 16,
    daysPerWeek: 5,
    weeks: Array.from({ length: 16 }, (_, i) => ({
      weekNumber: i + 1,
      focus: i < 5 ? 'Base' : i < 10 ? 'Construção' : i < 14 ? 'Qualidade' : 'Taper',
      workouts: [
        {
          id: `advanced-half-w${i + 1}-d1`,
          name: 'Corrida Leve',
          type: 'easy_run' as WorkoutType,
          description: 'Recuperação ativa',
          totalDuration: 40 + i * 2,
          blocks: [],
          benefits: ['Recuperação', 'Volume'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d2`,
          name: 'Intervalado',
          type: 'interval' as WorkoutType,
          description: 'Treino de velocidade',
          totalDuration: 45 + i * 2,
          blocks: [],
          benefits: ['Velocidade', 'Potência'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d3`,
          name: 'Tempo Run',
          type: 'tempo' as WorkoutType,
          description: 'Ritmo de prova',
          totalDuration: 50 + i * 2,
          blocks: [],
          benefits: ['Limiar', 'Ritmo'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d4`,
          name: 'Fartlek',
          type: 'fartlek' as WorkoutType,
          description: 'Velocidade variável',
          totalDuration: 45 + i * 2,
          blocks: [],
          benefits: ['Variabilidade', 'Diversão'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d5`,
          name: 'Longão',
          type: 'long_run' as WorkoutType,
          description: 'Treino longo',
          totalDuration: 60 + i * 4,
          blocks: [],
          benefits: ['Resistência', 'Adaptação'],
          difficulty: 'advanced' as const
        }
      ]
    }))
  }
]

/**
 * Planos de treino pré-definidos para a biblioteca
 */
export const TRAINING_PLANS: TrainingPlan[] = [
  {
    id: 'beginner-5k',
    name: 'Iniciante 5K',
    trainer: 'Run Easy',
    description: 'Plano ideal para quem está começando e quer completar seus primeiros 5km',
    level: 'beginner',
    goal: '5km',
    durationWeeks: 8,
    daysPerWeek: 3,
    weeks: Array.from({ length: 8 }, (_, i) => ({
      weekNumber: i + 1,
      focus: i < 3 ? 'Adaptação' : i < 6 ? 'Construção' : 'Consolidação',
      workouts: [
        {
          id: `beginner-5k-w${i + 1}-d1`,
          name: 'Caminhada + Corrida',
          type: 'walk_run' as WorkoutType,
          description: 'Alternância entre caminhada e corrida',
          totalDuration: 20 + i * 2,
          blocks: [],
          benefits: ['Adaptação', 'Desenvolvimento'],
          difficulty: 'beginner' as const
        },
        {
          id: `beginner-5k-w${i + 1}-d2`,
          name: 'Corrida Leve',
          type: 'easy_run' as WorkoutType,
          description: 'Corrida confortável',
          totalDuration: 25 + i * 2,
          blocks: [],
          benefits: ['Resistência', 'Condicionamento'],
          difficulty: 'beginner' as const
        },
        {
          id: `beginner-5k-w${i + 1}-d3`,
          name: 'Corrida Progressiva',
          type: 'progressive' as WorkoutType,
          description: 'Aumento gradual de intensidade',
          totalDuration: 30 + i * 2,
          blocks: [],
          benefits: ['Controle de ritmo', 'Evolução'],
          difficulty: 'beginner' as const
        }
      ]
    }))
  },
  {
    id: 'intermediate-10k',
    name: 'Intermediário 10K',
    trainer: 'Run Easy',
    description: 'Para corredores que já têm base e querem evoluir para 10km',
    level: 'intermediate',
    goal: '10km',
    durationWeeks: 12,
    daysPerWeek: 4,
    weeks: Array.from({ length: 12 }, (_, i) => ({
      weekNumber: i + 1,
      focus: i < 4 ? 'Base' : i < 8 ? 'Construção' : 'Qualidade',
      workouts: [
        {
          id: `intermediate-10k-w${i + 1}-d1`,
          name: 'Corrida Leve',
          type: 'easy_run' as WorkoutType,
          description: 'Corrida confortável',
          totalDuration: 30 + i * 2,
          blocks: [],
          benefits: ['Resistência aeróbica'],
          difficulty: 'intermediate' as const
        },
        {
          id: `intermediate-10k-w${i + 1}-d2`,
          name: 'Intervalado',
          type: 'interval' as WorkoutType,
          description: 'Treino de velocidade',
          totalDuration: 35 + i * 2,
          blocks: [],
          benefits: ['Velocidade', 'VO2max'],
          difficulty: 'intermediate' as const
        },
        {
          id: `intermediate-10k-w${i + 1}-d3`,
          name: 'Treino de Ritmo',
          type: 'tempo' as WorkoutType,
          description: 'Ritmo constante',
          totalDuration: 40 + i * 2,
          blocks: [],
          benefits: ['Limiar anaeróbico'],
          difficulty: 'intermediate' as const
        },
        {
          id: `intermediate-10k-w${i + 1}-d4`,
          name: 'Corrida Longa',
          type: 'long_run' as WorkoutType,
          description: 'Treino de resistência',
          totalDuration: 50 + i * 3,
          blocks: [],
          benefits: ['Resistência muscular'],
          difficulty: 'intermediate' as const
        }
      ]
    }))
  },
  {
    id: 'advanced-half-marathon',
    name: 'Avançado Meia Maratona',
    trainer: 'Run Easy',
    description: 'Plano completo para corredores experientes que buscam a meia maratona',
    level: 'advanced',
    goal: '21km',
    durationWeeks: 16,
    daysPerWeek: 5,
    weeks: Array.from({ length: 16 }, (_, i) => ({
      weekNumber: i + 1,
      focus: i < 5 ? 'Base' : i < 10 ? 'Construção' : i < 14 ? 'Qualidade' : 'Taper',
      workouts: [
        {
          id: `advanced-half-w${i + 1}-d1`,
          name: 'Corrida Leve',
          type: 'easy_run' as WorkoutType,
          description: 'Recuperação ativa',
          totalDuration: 40 + i * 2,
          blocks: [],
          benefits: ['Recuperação', 'Volume'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d2`,
          name: 'Intervalado',
          type: 'interval' as WorkoutType,
          description: 'Treino de velocidade',
          totalDuration: 45 + i * 2,
          blocks: [],
          benefits: ['Velocidade', 'Potência'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d3`,
          name: 'Tempo Run',
          type: 'tempo' as WorkoutType,
          description: 'Ritmo de prova',
          totalDuration: 50 + i * 2,
          blocks: [],
          benefits: ['Limiar', 'Ritmo'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d4`,
          name: 'Fartlek',
          type: 'fartlek' as WorkoutType,
          description: 'Velocidade variável',
          totalDuration: 45 + i * 2,
          blocks: [],
          benefits: ['Variabilidade', 'Diversão'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d5`,
          name: 'Longão',
          type: 'long_run' as WorkoutType,
          description: 'Treino longo',
          totalDuration: 60 + i * 4,
          blocks: [],
          benefits: ['Resistência', 'Adaptação'],
          difficulty: 'advanced' as const
        }
      ]
    }))
  }
]

/**
 * Planos de treino pré-definidos para a biblioteca
 */
export const TRAINING_PLANS: TrainingPlan[] = [
  {
    id: 'beginner-5k',
    name: 'Iniciante 5K',
    trainer: 'Run Easy',
    description: 'Plano ideal para quem está começando e quer completar seus primeiros 5km',
    level: 'beginner',
    goal: '5km',
    durationWeeks: 8,
    daysPerWeek: 3,
    weeks: Array.from({ length: 8 }, (_, i) => ({
      weekNumber: i + 1,
      focus: i < 3 ? 'Adaptação' : i < 6 ? 'Construção' : 'Consolidação',
      workouts: [
        {
          id: `beginner-5k-w${i + 1}-d1`,
          name: 'Caminhada + Corrida',
          type: 'walk_run' as WorkoutType,
          description: 'Alternância entre caminhada e corrida',
          totalDuration: 20 + i * 2,
          blocks: [],
          benefits: ['Adaptação', 'Desenvolvimento'],
          difficulty: 'beginner' as const
        },
        {
          id: `beginner-5k-w${i + 1}-d2`,
          name: 'Corrida Leve',
          type: 'easy_run' as WorkoutType,
          description: 'Corrida confortável',
          totalDuration: 25 + i * 2,
          blocks: [],
          benefits: ['Resistência', 'Condicionamento'],
          difficulty: 'beginner' as const
        },
        {
          id: `beginner-5k-w${i + 1}-d3`,
          name: 'Corrida Progressiva',
          type: 'progressive' as WorkoutType,
          description: 'Aumento gradual de intensidade',
          totalDuration: 30 + i * 2,
          blocks: [],
          benefits: ['Controle de ritmo', 'Evolução'],
          difficulty: 'beginner' as const
        }
      ]
    }))
  },
  {
    id: 'intermediate-10k',
    name: 'Intermediário 10K',
    trainer: 'Run Easy',
    description: 'Para corredores que já têm base e querem evoluir para 10km',
    level: 'intermediate',
    goal: '10km',
    durationWeeks: 12,
    daysPerWeek: 4,
    weeks: Array.from({ length: 12 }, (_, i) => ({
      weekNumber: i + 1,
      focus: i < 4 ? 'Base' : i < 8 ? 'Construção' : 'Qualidade',
      workouts: [
        {
          id: `intermediate-10k-w${i + 1}-d1`,
          name: 'Corrida Leve',
          type: 'easy_run' as WorkoutType,
          description: 'Corrida confortável',
          totalDuration: 30 + i * 2,
          blocks: [],
          benefits: ['Resistência aeróbica'],
          difficulty: 'intermediate' as const
        },
        {
          id: `intermediate-10k-w${i + 1}-d2`,
          name: 'Intervalado',
          type: 'interval' as WorkoutType,
          description: 'Treino de velocidade',
          totalDuration: 35 + i * 2,
          blocks: [],
          benefits: ['Velocidade', 'VO2max'],
          difficulty: 'intermediate' as const
        },
        {
          id: `intermediate-10k-w${i + 1}-d3`,
          name: 'Treino de Ritmo',
          type: 'tempo' as WorkoutType,
          description: 'Ritmo constante',
          totalDuration: 40 + i * 2,
          blocks: [],
          benefits: ['Limiar anaeróbico'],
          difficulty: 'intermediate' as const
        },
        {
          id: `intermediate-10k-w${i + 1}-d4`,
          name: 'Corrida Longa',
          type: 'long_run' as WorkoutType,
          description: 'Treino de resistência',
          totalDuration: 50 + i * 3,
          blocks: [],
          benefits: ['Resistência muscular'],
          difficulty: 'intermediate' as const
        }
      ]
    }))
  },
  {
    id: 'advanced-half-marathon',
    name: 'Avançado Meia Maratona',
    trainer: 'Run Easy',
    description: 'Plano completo para corredores experientes que buscam a meia maratona',
    level: 'advanced',
    goal: '21km',
    durationWeeks: 16,
    daysPerWeek: 5,
    weeks: Array.from({ length: 16 }, (_, i) => ({
      weekNumber: i + 1,
      focus: i < 5 ? 'Base' : i < 10 ? 'Construção' : i < 14 ? 'Qualidade' : 'Taper',
      workouts: [
        {
          id: `advanced-half-w${i + 1}-d1`,
          name: 'Corrida Leve',
          type: 'easy_run' as WorkoutType,
          description: 'Recuperação ativa',
          totalDuration: 40 + i * 2,
          blocks: [],
          benefits: ['Recuperação', 'Volume'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d2`,
          name: 'Intervalado',
          type: 'interval' as WorkoutType,
          description: 'Treino de velocidade',
          totalDuration: 45 + i * 2,
          blocks: [],
          benefits: ['Velocidade', 'Potência'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d3`,
          name: 'Tempo Run',
          type: 'tempo' as WorkoutType,
          description: 'Ritmo de prova',
          totalDuration: 50 + i * 2,
          blocks: [],
          benefits: ['Limiar', 'Ritmo'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d4`,
          name: 'Fartlek',
          type: 'fartlek' as WorkoutType,
          description: 'Velocidade variável',
          totalDuration: 45 + i * 2,
          blocks: [],
          benefits: ['Variabilidade', 'Diversão'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d5`,
          name: 'Longão',
          type: 'long_run' as WorkoutType,
          description: 'Treino longo',
          totalDuration: 60 + i * 4,
          blocks: [],
          benefits: ['Resistência', 'Adaptação'],
          difficulty: 'advanced' as const
        }
      ]
    }))
  }
]

/**
 * Planos de treino pré-definidos para a biblioteca
 */
export const TRAINING_PLANS: TrainingPlan[] = [
  {
    id: 'beginner-5k',
    name: 'Iniciante 5K',
    trainer: 'Run Easy',
    description: 'Plano ideal para quem está começando e quer completar seus primeiros 5km',
    level: 'beginner',
    goal: '5km',
    durationWeeks: 8,
    daysPerWeek: 3,
    weeks: Array.from({ length: 8 }, (_, i) => ({
      weekNumber: i + 1,
      focus: i < 3 ? 'Adaptação' : i < 6 ? 'Construção' : 'Consolidação',
      workouts: [
        {
          id: `beginner-5k-w${i + 1}-d1`,
          name: 'Caminhada + Corrida',
          type: 'walk_run' as WorkoutType,
          description: 'Alternância entre caminhada e corrida',
          totalDuration: 20 + i * 2,
          blocks: [],
          benefits: ['Adaptação', 'Desenvolvimento'],
          difficulty: 'beginner' as const
        },
        {
          id: `beginner-5k-w${i + 1}-d2`,
          name: 'Corrida Leve',
          type: 'easy_run' as WorkoutType,
          description: 'Corrida confortável',
          totalDuration: 25 + i * 2,
          blocks: [],
          benefits: ['Resistência', 'Condicionamento'],
          difficulty: 'beginner' as const
        },
        {
          id: `beginner-5k-w${i + 1}-d3`,
          name: 'Corrida Progressiva',
          type: 'progressive' as WorkoutType,
          description: 'Aumento gradual de intensidade',
          totalDuration: 30 + i * 2,
          blocks: [],
          benefits: ['Controle de ritmo', 'Evolução'],
          difficulty: 'beginner' as const
        }
      ]
    }))
  },
  {
    id: 'intermediate-10k',
    name: 'Intermediário 10K',
    trainer: 'Run Easy',
    description: 'Para corredores que já têm base e querem evoluir para 10km',
    level: 'intermediate',
    goal: '10km',
    durationWeeks: 12,
    daysPerWeek: 4,
    weeks: Array.from({ length: 12 }, (_, i) => ({
      weekNumber: i + 1,
      focus: i < 4 ? 'Base' : i < 8 ? 'Construção' : 'Qualidade',
      workouts: [
        {
          id: `intermediate-10k-w${i + 1}-d1`,
          name: 'Corrida Leve',
          type: 'easy_run' as WorkoutType,
          description: 'Corrida confortável',
          totalDuration: 30 + i * 2,
          blocks: [],
          benefits: ['Resistência aeróbica'],
          difficulty: 'intermediate' as const
        },
        {
          id: `intermediate-10k-w${i + 1}-d2`,
          name: 'Intervalado',
          type: 'interval' as WorkoutType,
          description: 'Treino de velocidade',
          totalDuration: 35 + i * 2,
          blocks: [],
          benefits: ['Velocidade', 'VO2max'],
          difficulty: 'intermediate' as const
        },
        {
          id: `intermediate-10k-w${i + 1}-d3`,
          name: 'Treino de Ritmo',
          type: 'tempo' as WorkoutType,
          description: 'Ritmo constante',
          totalDuration: 40 + i * 2,
          blocks: [],
          benefits: ['Limiar anaeróbico'],
          difficulty: 'intermediate' as const
        },
        {
          id: `intermediate-10k-w${i + 1}-d4`,
          name: 'Corrida Longa',
          type: 'long_run' as WorkoutType,
          description: 'Treino de resistência',
          totalDuration: 50 + i * 3,
          blocks: [],
          benefits: ['Resistência muscular'],
          difficulty: 'intermediate' as const
        }
      ]
    }))
  },
  {
    id: 'advanced-half-marathon',
    name: 'Avançado Meia Maratona',
    trainer: 'Run Easy',
    description: 'Plano completo para corredores experientes que buscam a meia maratona',
    level: 'advanced',
    goal: '21km',
    durationWeeks: 16,
    daysPerWeek: 5,
    weeks: Array.from({ length: 16 }, (_, i) => ({
      weekNumber: i + 1,
      focus: i < 5 ? 'Base' : i < 10 ? 'Construção' : i < 14 ? 'Qualidade' : 'Taper',
      workouts: [
        {
          id: `advanced-half-w${i + 1}-d1`,
          name: 'Corrida Leve',
          type: 'easy_run' as WorkoutType,
          description: 'Recuperação ativa',
          totalDuration: 40 + i * 2,
          blocks: [],
          benefits: ['Recuperação', 'Volume'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d2`,
          name: 'Intervalado',
          type: 'interval' as WorkoutType,
          description: 'Treino de velocidade',
          totalDuration: 45 + i * 2,
          blocks: [],
          benefits: ['Velocidade', 'Potência'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d3`,
          name: 'Tempo Run',
          type: 'tempo' as WorkoutType,
          description: 'Ritmo de prova',
          totalDuration: 50 + i * 2,
          blocks: [],
          benefits: ['Limiar', 'Ritmo'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d4`,
          name: 'Fartlek',
          type: 'fartlek' as WorkoutType,
          description: 'Velocidade variável',
          totalDuration: 45 + i * 2,
          blocks: [],
          benefits: ['Variabilidade', 'Diversão'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d5`,
          name: 'Longão',
          type: 'long_run' as WorkoutType,
          description: 'Treino longo',
          totalDuration: 60 + i * 4,
          blocks: [],
          benefits: ['Resistência', 'Adaptação'],
          difficulty: 'advanced' as const
        }
      ]
    }))
  }
]

/**
 * Planos de treino pré-definidos para a biblioteca
 */
export const TRAINING_PLANS: TrainingPlan[] = [
  {
    id: 'beginner-5k',
    name: 'Iniciante 5K',
    trainer: 'Run Easy',
    description: 'Plano ideal para quem está começando e quer completar seus primeiros 5km',
    level: 'beginner',
    goal: '5km',
    durationWeeks: 8,
    daysPerWeek: 3,
    weeks: Array.from({ length: 8 }, (_, i) => ({
      weekNumber: i + 1,
      focus: i < 3 ? 'Adaptação' : i < 6 ? 'Construção' : 'Consolidação',
      workouts: [
        {
          id: `beginner-5k-w${i + 1}-d1`,
          name: 'Caminhada + Corrida',
          type: 'walk_run' as WorkoutType,
          description: 'Alternância entre caminhada e corrida',
          totalDuration: 20 + i * 2,
          blocks: [],
          benefits: ['Adaptação', 'Desenvolvimento'],
          difficulty: 'beginner' as const
        },
        {
          id: `beginner-5k-w${i + 1}-d2`,
          name: 'Corrida Leve',
          type: 'easy_run' as WorkoutType,
          description: 'Corrida confortável',
          totalDuration: 25 + i * 2,
          blocks: [],
          benefits: ['Resistência', 'Condicionamento'],
          difficulty: 'beginner' as const
        },
        {
          id: `beginner-5k-w${i + 1}-d3`,
          name: 'Corrida Progressiva',
          type: 'progressive' as WorkoutType,
          description: 'Aumento gradual de intensidade',
          totalDuration: 30 + i * 2,
          blocks: [],
          benefits: ['Controle de ritmo', 'Evolução'],
          difficulty: 'beginner' as const
        }
      ]
    }))
  },
  {
    id: 'intermediate-10k',
    name: 'Intermediário 10K',
    trainer: 'Run Easy',
    description: 'Para corredores que já têm base e querem evoluir para 10km',
    level: 'intermediate',
    goal: '10km',
    durationWeeks: 12,
    daysPerWeek: 4,
    weeks: Array.from({ length: 12 }, (_, i) => ({
      weekNumber: i + 1,
      focus: i < 4 ? 'Base' : i < 8 ? 'Construção' : 'Qualidade',
      workouts: [
        {
          id: `intermediate-10k-w${i + 1}-d1`,
          name: 'Corrida Leve',
          type: 'easy_run' as WorkoutType,
          description: 'Corrida confortável',
          totalDuration: 30 + i * 2,
          blocks: [],
          benefits: ['Resistência aeróbica'],
          difficulty: 'intermediate' as const
        },
        {
          id: `intermediate-10k-w${i + 1}-d2`,
          name: 'Intervalado',
          type: 'interval' as WorkoutType,
          description: 'Treino de velocidade',
          totalDuration: 35 + i * 2,
          blocks: [],
          benefits: ['Velocidade', 'VO2max'],
          difficulty: 'intermediate' as const
        },
        {
          id: `intermediate-10k-w${i + 1}-d3`,
          name: 'Treino de Ritmo',
          type: 'tempo' as WorkoutType,
          description: 'Ritmo constante',
          totalDuration: 40 + i * 2,
          blocks: [],
          benefits: ['Limiar anaeróbico'],
          difficulty: 'intermediate' as const
        },
        {
          id: `intermediate-10k-w${i + 1}-d4`,
          name: 'Corrida Longa',
          type: 'long_run' as WorkoutType,
          description: 'Treino de resistência',
          totalDuration: 50 + i * 3,
          blocks: [],
          benefits: ['Resistência muscular'],
          difficulty: 'intermediate' as const
        }
      ]
    }))
  },
  {
    id: 'advanced-half-marathon',
    name: 'Avançado Meia Maratona',
    trainer: 'Run Easy',
    description: 'Plano completo para corredores experientes que buscam a meia maratona',
    level: 'advanced',
    goal: '21km',
    durationWeeks: 16,
    daysPerWeek: 5,
    weeks: Array.from({ length: 16 }, (_, i) => ({
      weekNumber: i + 1,
      focus: i < 5 ? 'Base' : i < 10 ? 'Construção' : i < 14 ? 'Qualidade' : 'Taper',
      workouts: [
        {
          id: `advanced-half-w${i + 1}-d1`,
          name: 'Corrida Leve',
          type: 'easy_run' as WorkoutType,
          description: 'Recuperação ativa',
          totalDuration: 40 + i * 2,
          blocks: [],
          benefits: ['Recuperação', 'Volume'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d2`,
          name: 'Intervalado',
          type: 'interval' as WorkoutType,
          description: 'Treino de velocidade',
          totalDuration: 45 + i * 2,
          blocks: [],
          benefits: ['Velocidade', 'Potência'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d3`,
          name: 'Tempo Run',
          type: 'tempo' as WorkoutType,
          description: 'Ritmo de prova',
          totalDuration: 50 + i * 2,
          blocks: [],
          benefits: ['Limiar', 'Ritmo'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d4`,
          name: 'Fartlek',
          type: 'fartlek' as WorkoutType,
          description: 'Velocidade variável',
          totalDuration: 45 + i * 2,
          blocks: [],
          benefits: ['Variabilidade', 'Diversão'],
          difficulty: 'advanced' as const
        },
        {
          id: `advanced-half-w${i + 1}-d5`,
          name: 'Longão',
          type: 'long_run' as WorkoutType,
          description: 'Treino longo',
          totalDuration: 60 + i * 4,
          blocks: [],
          benefits: ['Resistência', 'Adaptação'],
          difficulty: 'advanced' as const
        }
      ]
    }))
  }
]

/**
 * Função principal para gerar plano personalizado baseado no questionário
 */
export function generateCustomPlan(anamneseData: AnamneseData): TrainingPlan {
  const {
    objetivoPrincipal,
    dataProva,
    distanciaAlvo,
    nivelAtividade,
    diasDisponiveis,
    lesaoRecente,
    dorAtual
  } = anamneseData

  // Mapear nível de atividade
  const level = mapActivityLevel(nivelAtividade)
  const daysPerWeek = diasDisponiveis.length
  const hasInjury = lesaoRecente === 'sim' || dorAtual === 'sim'

  // Validar dias disponíveis (mínimo 1 dia de descanso)
  if (daysPerWeek > 6) {
    throw new Error('É necessário pelo menos 1 dia de descanso por semana')
  }

  // 🔹 CASO 1 — Objetivo: "Praticar para uma prova"
  if (objetivoPrincipal === 'prova') {
    if (!dataProva) {
      throw new Error('Data da prova é obrigatória para este objetivo')
    }

    const provaDate = new Date(dataProva)
    const today = new Date()
    const weeksUntilRace = Math.ceil((provaDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 7))

    // Validar período (4-16 semanas)
    if (weeksUntilRace < 4) {
      throw new Error('O período até a prova deve ser de pelo menos 4 semanas para uma preparação segura')
    }
    if (weeksUntilRace > 16) {
      throw new Error('O período até a prova não deve ultrapassar 16 semanas. Considere um plano de desenvolvimento geral primeiro')
    }

    return generateRacePlan({
      weeksUntilRace,
      level,
      daysPerWeek,
      hasInjury,
      distanciaAlvo: distanciaAlvo || '5km',
      diasDisponiveis
    })
  }

  // 🔹 CASO 2 — Outros objetivos - plano de 12 semanas
  return generateGeneralPlan({
    objetivo: objetivoPrincipal,
    level,
    daysPerWeek,
    hasInjury,
    distanciaAlvo,
    diasDisponiveis
  })
}

/**
 * Mapeia nível de atividade para nível de treino
 */
function mapActivityLevel(nivel: string): 'beginner' | 'intermediate' | 'advanced' {
  switch (nivel) {
    case 'sedentario':
    case 'iniciante':
      return 'beginner'
    case 'intermediario_leve':
      return 'intermediate'
    default:
      return 'beginner'
  }
}

/**
 * Gera plano periodizado para prova (4-16 semanas)
 */
function generateRacePlan(params: {
  weeksUntilRace: number
  level: 'beginner' | 'intermediate' | 'advanced'
  daysPerWeek: number
  hasInjury: boolean
  distanciaAlvo: string
  diasDisponiveis: string[]
}): TrainingPlan {
  const { weeksUntilRace, level, daysPerWeek, hasInjury, distanciaAlvo, diasDisponiveis } = params
  const weeks = []

  for (let weekNum = 1; weekNum <= weeksUntilRace; weekNum++) {
    const progress = weekNum / weeksUntilRace
    let focus = ''
    let phase = ''

    // Definir fase e foco baseado no progresso
    if (progress <= 0.25) {
      phase = 'base'
      focus = 'Base e adaptação'
    } else if (progress <= 0.50) {
      phase = 'build'
      focus = 'Construção de volume'
    } else if (progress <= 0.75) {
      phase = 'peak'
      focus = 'Qualidade e velocidade'
    } else {
      phase = 'taper'
      focus = 'Redução e recuperação'
    }

    const workouts = generateWeeklyWorkouts({
      level,
      daysPerWeek,
      phase,
      hasInjury,
      weekNum,
      totalWeeks: weeksUntilRace,
      isRacePlan: true,
      diasDisponiveis
    })

    weeks.push({ weekNumber: weekNum, focus, workouts })
  }

  return {
    id: `race-${Date.now()}`,
    name: `Preparação para ${distanciaAlvo}`,
    trainer: 'Run Easy',
    description: `Plano personalizado de ${weeksUntilRace} semanas focado na sua prova de ${distanciaAlvo}`,
    level,
    goal: distanciaAlvo,
    durationWeeks: weeksUntilRace,
    daysPerWeek,
    weeks
  }
}

/**
 * Gera plano geral de 12 semanas (sem prova específica)
 */
function generateGeneralPlan(params: {
  objetivo: string
  level: 'beginner' | 'intermediate' | 'advanced'
  daysPerWeek: number
  hasInjury: boolean
  distanciaAlvo?: string
  diasDisponiveis: string[]
}): TrainingPlan {
  const { objetivo, level, daysPerWeek, hasInjury, distanciaAlvo, diasDisponiveis } = params
  const weeks = []
  const totalWeeks = 12

  for (let weekNum = 1; weekNum <= totalWeeks; weekNum++) {
    let focus = ''
    let phase = ''

    // Definir fase e foco
    if (weekNum <= 4) {
      phase = 'adaptation'
      focus = 'Adaptação e criação de hábito'
    } else if (weekNum <= 8) {
      phase = 'development'
      focus = 'Evolução gradual'
    } else {
      phase = 'consolidation'
      focus = 'Consolidação e manutenção'
    }

    const workouts = generateWeeklyWorkouts({
      level,
      daysPerWeek,
      phase,
      hasInjury,
      weekNum,
      totalWeeks,
      isRacePlan: false,
      diasDisponiveis
    })

    weeks.push({ weekNumber: weekNum, focus, workouts })
  }

  // Definir nome e descrição baseado no objetivo
  let planName = 'Plano de Desenvolvimento'
  let planDescription = 'Plano de 12 semanas focado no seu desenvolvimento como corredor'

  switch (objetivo) {
    case 'condicionamento':
      planName = 'Melhoria do Condicionamento'
      planDescription = 'Plano de 12 semanas para melhorar seu condicionamento físico geral através da corrida'
      break
    case 'correr_sem_parar':
      planName = 'Corrida Contínua'
      planDescription = 'Plano de 12 semanas para você conseguir correr sem parar de forma confortável'
      break
    case 'aumentar_distancia':
      planName = 'Aumento de Distância'
      planDescription = `Plano de 12 semanas para aumentar sua distância de corrida${distanciaAlvo ? ` até ${distanciaAlvo}` : ''}`
      break
    case 'consistencia':
      planName = 'Criação de Consistência'
      planDescription = 'Plano de 12 semanas para criar o hábito regular de corrida'
      break
  }

  return {
    id: `general-${Date.now()}`,
    name: planName,
    trainer: 'Run Easy',
    description: planDescription,
    level,
    goal: distanciaAlvo || 'Desenvolvimento geral',
    durationWeeks: totalWeeks,
    daysPerWeek,
    weeks
  }
}

/**
 * Gera treinos semanais baseado em múltiplos fatores
 */
function generateWeeklyWorkouts(params: {
  level: 'beginner' | 'intermediate' | 'advanced'
  daysPerWeek: number
  phase: string
  hasInjury: boolean
  weekNum: number
  totalWeeks: number
  isRacePlan: boolean
  diasDisponiveis: string[]
}): Workout[] {
  const { level, daysPerWeek, phase, hasInjury, weekNum, totalWeeks, isRacePlan, diasDisponiveis } = params
  const workouts: Workout[] = []
  const progress = weekNum / totalWeeks

  // Definir tipos de treino baseado no nível e fase
  const workoutTypes = selectWorkoutTypes(level, phase, daysPerWeek, hasInjury, isRacePlan)

  // Distribuir treinos nos dias disponíveis
  for (let i = 0; i < daysPerWeek; i++) {
    const workoutType = workoutTypes[i] || 'easy_run'
    const duration = calculateDuration(level, workoutType, progress, phase, hasInjury)
    
    const workout = createCustomWorkout({
      type: workoutType,
      duration,
      weekNum,
      dayNum: i + 1,
      level,
      phase
    })

    workouts.push(workout)
  }

  return workouts
}

/**
 * Seleciona tipos de treino apropriados baseado em múltiplos fatores
 */
function selectWorkoutTypes(
  level: 'beginner' | 'intermediate' | 'advanced',
  phase: string,
  daysPerWeek: number,
  hasInjury: boolean,
  isRacePlan: boolean
): WorkoutType[] {
  const types: WorkoutType[] = []

  // Para iniciantes ou pessoas com lesão, priorizar treinos mais leves
  if (level === 'beginner' || hasInjury) {
    if (phase === 'base' || phase === 'adaptation') {
      // Fase inicial: caminhada + corrida e corridas leves
      for (let i = 0; i < daysPerWeek; i++) {
        if (i === 0) types.push('walk_run')
        else if (i % 2 === 0) types.push('walk_run')
        else types.push('easy_run')
      }
    } else if (phase === 'build' || phase === 'development') {
      // Fase de construção: mais corridas leves, introduzir progressivos
      for (let i = 0; i < daysPerWeek; i++) {
        if (i === 0) types.push('easy_run')
        else if (i === 1 && daysPerWeek >= 3) types.push('progressive')
        else types.push('easy_run')
      }
    } else if (phase === 'peak') {
      // Fase de pico: introduzir intervalados leves
      for (let i = 0; i < daysPerWeek; i++) {
        if (i === 0) types.push('easy_run')
        else if (i === 1 && daysPerWeek >= 3) types.push('interval')
        else if (i === 2 && daysPerWeek >= 4) types.push('progressive')
        else types.push('easy_run')
      }
    } else {
      // Taper ou consolidação: reduzir intensidade
      for (let i = 0; i < daysPerWeek; i++) {
        if (i % 2 === 0) types.push('easy_run')
        else types.push('recovery_run')
      }
    }
  } else if (level === 'intermediate') {
    // Nível intermediário: mais variedade
    if (phase === 'base' || phase === 'adaptation') {
      for (let i = 0; i < daysPerWeek; i++) {
        if (i === 0) types.push('easy_run')
        else if (i === 1) types.push('progressive')
        else if (i === 2 && daysPerWeek >= 4) types.push('easy_run')
        else types.push('easy_run')
      }
    } else if (phase === 'build' || phase === 'development') {
      for (let i = 0; i < daysPerWeek; i++) {
        if (i === 0) types.push('easy_run')
        else if (i === 1) types.push('interval')
        else if (i === 2 && daysPerWeek >= 3) types.push('tempo')
        else if (i === 3 && daysPerWeek >= 4) types.push('easy_run')
        else types.push('easy_run')
      }
    } else if (phase === 'peak') {
      for (let i = 0; i < daysPerWeek; i++) {
        if (i === 0) types.push('easy_run')
        else if (i === 1) types.push('interval')
        else if (i === 2 && daysPerWeek >= 3) types.push('tempo')
        else if (i === 3 && daysPerWeek >= 4) types.push('long_run')
        else types.push('easy_run')
      }
    } else {
      // Taper
      for (let i = 0; i < daysPerWeek; i++) {
        if (i === 0) types.push('easy_run')
        else if (i === 1 && daysPerWeek >= 3) types.push('progressive')
        else types.push('recovery_run')
      }
    }
  } else {
    // Nível avançado: máxima variedade
    for (let i = 0; i < daysPerWeek; i++) {
      if (i === 0) types.push('easy_run')
      else if (i === 1) types.push('interval')
      else if (i === 2) types.push('tempo')
      else if (i === 3) types.push('long_run')
      else if (i === 4) types.push('fartlek')
      else types.push('easy_run')
    }
  }

  return types
}

/**
 * Calcula duração apropriada do treino
 */
function calculateDuration(
  level: 'beginner' | 'intermediate' | 'advanced',
  workoutType: WorkoutType,
  progress: number,
  phase: string,
  hasInjury: boolean
): number {
  let baseDuration = 20
  let maxDuration = 45

  // Ajustar baseado no nível
  if (level === 'beginner') {
    baseDuration = 20
    maxDuration = 45
  } else if (level === 'intermediate') {
    baseDuration = 30
    maxDuration = 60
  } else {
    baseDuration = 40
    maxDuration = 90
  }

  // Reduzir se tiver lesão
  if (hasInjury) {
    baseDuration = Math.max(15, baseDuration - 10)
    maxDuration = Math.max(30, maxDuration - 15)
  }

  // Ajustar baseado no tipo de treino
  let durationMultiplier = 1.0
  if (workoutType === 'long_run') {
    durationMultiplier = 1.5
  } else if (workoutType === 'walk_run') {
    durationMultiplier = 0.8
  } else if (workoutType === 'recovery_run') {
    durationMultiplier = 0.7
  }

  // Reduzir na fase de taper
  if (phase === 'taper') {
    durationMultiplier *= 0.7
  }

  // Progressão ao longo das semanas
  const duration = baseDuration + (maxDuration - baseDuration) * progress * durationMultiplier

  return Math.round(duration / 5) * 5 // Arredondar para múltiplos de 5
}

/**
 * Cria workout personalizado
 */
function createCustomWorkout(params: {
  type: WorkoutType
  duration: number
  weekNum: number
  dayNum: number
  level: 'beginner' | 'intermediate' | 'advanced'
  phase: string
}): Workout {
  const { type, duration, weekNum, dayNum, level, phase } = params

  // Buscar workout base da biblioteca
  const baseWorkouts = WORKOUTS_LIBRARY[type]
  const baseWorkout = baseWorkouts[0]

  // Ajustar blocos baseado na duração desejada
  const adjustedBlocks = adjustWorkoutBlocks(baseWorkout.blocks, duration)

  // Criar nome humanizado
  const workoutName = generateWorkoutName(type, weekNum, phase)

  return {
    id: `${type}-${weekNum}-${dayNum}-${Date.now()}`,
    name: workoutName,
    type,
    description: baseWorkout.description,
    totalDuration: duration,
    blocks: adjustedBlocks,
    benefits: baseWorkout.benefits,
    difficulty: level
  }
}

/**
 * Gera nome humanizado para o treino
 */
function generateWorkoutName(type: WorkoutType, weekNum: number, phase: string): string {
  const names: Record<WorkoutType, string[]> = {
    walk_run: ['Adaptação Inicial', 'Caminhada + Trote', 'Primeiros Passos'],
    easy_run: ['Corrida Tranquila', 'Rodagem Leve', 'Corrida Confortável'],
    progressive: ['Treino Progressivo', 'Evolução Gradual', 'Ritmo Crescente'],
    interval: ['Treino de Velocidade', 'Intervalado', 'Estímulo de Ritmo'],
    tempo: ['Treino de Ritmo', 'Corrida Constante', 'Ritmo Controlado'],
    long_run: ['Corrida Longa', 'Longão', 'Treino de Resistência'],
    fartlek: ['Fartlek', 'Velocidade Variável', 'Treino Divertido'],
    hill_repeats: ['Treino de Subida', 'Fortalecimento', 'Subidas'],
    recovery_run: ['Recuperação Ativa', 'Corrida Regenerativa', 'Treino Leve']
  }

  const options = names[type] || ['Treino']
  const index = weekNum % options.length
  return options[index]
}

/**
 * Ajusta blocos do treino para a duração desejada
 */
function adjustWorkoutBlocks(blocks: WorkoutBlock[], targetDuration: number): WorkoutBlock[] {
  const totalOriginal = blocks.reduce((sum, block) => sum + block.duration, 0)
  
  if (totalOriginal === 0) return blocks

  const ratio = targetDuration / totalOriginal

  return blocks.map(block => ({
    ...block,
    duration: Math.max(1, Math.round(block.duration * ratio))
  }))
}
