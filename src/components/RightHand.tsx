import { twMerge } from 'tailwind-merge'
import { FingerColors } from '../types/FingerColors'

function RightHand ({ fingerColors }: { fingerColors: FingerColors }) {
  return (
    <div className={`pl-[65px]`}>
      <div className={`flex gap-[2px] items-end`}>
        <div className={twMerge(`bg-gradient-to-b ${fingerColors.rindex} to-slate-400 w-9 h-[120px] rounded-t-2xl`)}></div>
        <div className={twMerge(`bg-gradient-to-b ${fingerColors.rmiddle} to-slate-400 w-9 h-[166px] rounded-t-2xl`)}></div>
        <div className={twMerge(`bg-gradient-to-b ${fingerColors.rring} to-slate-400 w-9 h-[146px] rounded-t-2xl`)}></div>
        <div className={twMerge(`bg-gradient-to-b ${fingerColors.rlittle} to-slate-400 w-9 h-[106px] rounded-t-2xl`)}></div>
      </div>
      <div className={twMerge(`bg-gradient-to-b from-slate-400 to-slate-400 w-[150px] h-[120px] rounded-br-[72px] rounded-bl-[52px] relative`)}>
        <div className={twMerge(`bg-gradient-to-b ${fingerColors.thumb} from-10% via-slate-400 to-slate-400 w-[45px] h-[120px] rounded-t-3xl rotate-[-43deg] absolute left-[-37px] top-[-20px]`)}></div>
      </div>
    </div>
  )
}

export default RightHand