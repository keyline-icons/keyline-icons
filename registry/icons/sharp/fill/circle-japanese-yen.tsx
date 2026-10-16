import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleJapaneseYen({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 1C17.9372 1 23 6.0628 23 12C23 17.9372 17.9372 23 12 23C6.0628 23 1 17.9372 1 12C1 6.0628 6.0628 1 12 1ZM9.0052 5.0587L7.5 6.3757L11 10.3757L11 12L7.5 12L7.5 14L11 14L11 15L7.5 15L7.5 17L11 17L11 19L13 19L13 17L16.5 17L16.5 15L13 15L13 14L16.5 14L16.5 12L13 12L13 10.3757L16.5 6.3757L14.9948 5.0587L12 8.4814L9.0052 5.0587Z" fill="currentColor"/>
    </svg>
  )
}
