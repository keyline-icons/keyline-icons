import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function VolumeMinus({ size = 24, ...props }: IconProps) {
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
      <path d="M1 10C1 8.895431 1.895431 8 3 8L5.477658 8L8.3585 3.861189C9.477163 2.254043 12 3.045621 12 5.003765L12 18.996235C12 20.954379 9.477163 21.745957 8.3585 20.138811L5.477658 16L3 16C1.895431 16 1 15.104569 1 14Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M16 12L22 12"/>
    </svg>
  )
}
