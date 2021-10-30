import styles from '../styles/Home.module.css'
import { GetServerSideProps } from 'next'
import withModels from '../models/withModels.hoc'
import { Step } from '../models/step.model'
import { Stretch } from '../models/stretch.model'
import { Stretch as StretchType, Step as StepType } from '../models/models.dto'
import { useEffect, useMemo, useRef, useState } from 'react'

export const getServerSideProps: GetServerSideProps = withModels(async () => {
  const stretches = await Stretch.findAll({ include: [Step] });
  return {
    props: {
      stretches: stretches.map(stretch => stretch.toDto()),
    }
  }
})


type SessionProps = {
  stretches: StretchType[],
}

const StretchViewer = ({ stretch }: { stretch: StretchType }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentStepIndex(0);
  }, [stretch])

  useEffect(() => {
    const numSteps = stretch.steps.length || 0
    if (numSteps > 1) {
      timeout.current = setInterval(() => {
        console.log(`interval run for stretch ${stretch.name} ${currentStepIndex} ${numSteps}`);
        setCurrentStepIndex(
          currentStepIndex => numSteps - 1 === currentStepIndex ? 0 : currentStepIndex + 1
        );
      }, 3000)
    }

    return () => {
      if (timeout.current) {
        clearInterval(timeout.current);
        timeout.current = null
      };
    }
  }, [stretch, currentStepIndex])

  const currentStep = useMemo(() => {
    const currentStep = (stretch.steps || []).find((_, index) => index === currentStepIndex)
    return currentStep
  }, [currentStepIndex, stretch])

  return (
    <div>
      <h1 style={{ border: '1px solid green' }}>{stretch.name}</h1>
      {currentStep && (
        <div>
          <img style={{ border: '1px solid red' }} width='200' height='200' src={currentStep.assetUrl} />
          <StepsDescription steps={stretch.steps} />
        </div>
      )}
    </div>
  )
}

const StepsDescription = ({ steps }: { steps: StepType[] }) => {
  return (
    <ol>
      {steps.map(step => <li>{step.description}</li>)}
    </ol>
  )
}

type NavigationProps = {
  goToNext: () => void;
  goToPrevious: () => void;
  previousDisabled: boolean;
  nextDisabled: boolean;
}

const Navigation = ({ goToNext, goToPrevious, previousDisabled, nextDisabled }: NavigationProps) => {
  return (
    <div className={styles.navigation}>
      <button disabled={previousDisabled} onClick={goToPrevious}>Previous</button>
      <button disabled={nextDisabled} onClick={goToNext}>Next</button>
    </div>
  )
}

export default function Session({ stretches }: SessionProps) {
  const [currentStretchIndex, setCurrentStretchIndex] = useState(0);

  const currentStretch = useMemo(() => {
    const currentStretch = stretches.find((_, index) => index === currentStretchIndex)
    return currentStretch
  }, [currentStretchIndex])

  return (
    <>
      {!currentStretch && <span>Loading</span>}
      {currentStretch && (
        <div>
          <StretchViewer stretch={currentStretch} />
          <Navigation
            goToNext={() => setCurrentStretchIndex(index => index + 1)}
            goToPrevious={() => setCurrentStretchIndex(index => index - 1)}
            previousDisabled={currentStretchIndex === 0}
            nextDisabled={currentStretchIndex === stretches.length - 1}
          />
        </div>
      )}
    </>
  )
}
