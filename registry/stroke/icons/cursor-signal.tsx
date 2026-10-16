import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CursorSignal({ size = 24, ...props }: IconProps) {
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
      <path d="M10.28833 10.85532L13.73316 21.68113C13.85938 22.07792 14.40834 22.11353 14.58508 21.73651L16.85711 16.88931C16.9055 16.78618 16.99069 16.70466 17.09612 16.66096L21.71784 14.7424C22.10893 14.58002 22.08869 14.02075 21.68692 13.88689L10.87031 10.28354C10.51489 10.16514 10.17497 10.4991 10.28833 10.85532ZM6 10C6 7.7909 7.7909 6 10 6M2 10C2 5.5817 5.5817 2 10 2"/>
    </svg>
  )
}
