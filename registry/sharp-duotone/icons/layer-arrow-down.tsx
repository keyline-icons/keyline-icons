import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LayerArrowDown({ size = 24, ...props }: IconProps) {
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
      <path d="M4.0191 9.0007L1.5201 7.6262C1.2005 7.4505 1.002 7.1147 1.002 6.75C1.002 6.3853 1.2005 6.0495 1.5201 5.8738L6.5181 3.1248C6.6657 3.0436 6.8315 3.001 7 3.001C7.1685 3.001 7.3343 3.0436 7.4819 3.1248L12.4799 5.8738C12.7995 6.0495 12.998 6.3853 12.998 6.75C12.998 7.1147 12.7995 7.4505 12.4799 7.6262L7.4819 10.3752C7.3343 10.4564 7.1685 10.499 7 10.499C6.8315 10.499 6.6657 10.4564 6.5181 10.3752Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1.4472 12.0326L7 14.809L12.5528 12.0326M1.4472 17.2826L7 20.059L12.5528 17.2826M19 2L19 21M15.7071 17.7071L19 21L22.2929 17.7071"/>
    </svg>
  )
}
