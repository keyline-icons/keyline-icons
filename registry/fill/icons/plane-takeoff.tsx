import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PlaneTakeoff({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4.0308 15.7603L1.4021 12.9703C1.075 12.6231 0.9509 12.163 1.0174 11.7338C1.0838 11.305 1.3403 10.9062 1.7522 10.6731L2.3196 10.3519C2.5168 10.2402 2.734 10.1767 2.9533 10.1615C3.1729 10.1463 3.3964 10.1794 3.6069 10.2625L5.967 11.1942L8.269 9.8865L4.6822 6.5855C4.3161 6.2481 4.1631 5.775 4.216 5.3278C4.2688 4.881 4.5274 4.4586 4.9579 4.2149L6.7613 3.194C6.9823 3.0689 7.2272 3.0046 7.4718 3.0002C7.7165 2.9959 7.9635 3.0514 8.1887 3.1684L14.4664 6.4292L16.5448 5.4599C17.0019 5.2472 17.4787 5.1098 17.9586 5.0439C18.4382 4.9781 18.92 4.9839 19.3885 5.0563C19.857 5.1287 20.3131 5.2677 20.7415 5.4691C21.1701 5.6706 21.5717 5.9347 21.9304 6.2574C22.2893 6.5803 22.6045 6.961 22.8599 7.3942C23.144 7.8758 22.978 8.4967 22.4915 8.7723L8.8768 16.4843C8.3469 16.7842 7.7701 16.9507 7.1914 16.9906C6.6134 17.0304 6.0324 16.944 5.4915 16.7374C4.9499 16.5305 4.4477 16.2027 4.0309 15.7603Z" fill="currentColor" stroke="none"/>
      <path d="M2 20L22 20" fill="none"/>
    </svg>
  )
}
