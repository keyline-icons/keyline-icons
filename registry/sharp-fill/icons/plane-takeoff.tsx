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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4.0309 15.7603L1.2722 12.8324C0.9043 12.4419 0.91 11.8308 1.2851 11.4473L2.3037 10.406C2.5851 10.1184 3.0115 10.0274 3.3858 10.1752L5.967 11.1942L8.269 9.8866L4.2023 6.1432C3.7038 5.6836 3.7974 4.8716 4.3875 4.5376L6.8749 3.1297C7.1648 2.9656 7.5175 2.9567 7.8153 3.1059L14.4582 6.433L16.5448 5.4599C17.0019 5.2472 17.4787 5.1098 17.9586 5.0439C18.4382 4.9781 18.9199 4.9839 19.3885 5.0563C19.857 5.1287 20.313 5.2677 20.7415 5.4691C21.1701 5.6706 21.5717 5.9347 21.9304 6.2574C22.2893 6.5803 22.6045 6.961 22.86 7.3942C23.144 7.8758 22.978 8.4967 22.4915 8.7723L8.8768 16.4843C8.3469 16.7842 7.7701 16.9507 7.1914 16.9906C6.6134 17.0304 6.0324 16.944 5.4915 16.7374C4.9499 16.5305 4.4477 16.2027 4.0309 15.7603Z" fill="currentColor" stroke="none"/>
      <path d="M1 20L23 20" fill="none"/>
    </svg>
  )
}
