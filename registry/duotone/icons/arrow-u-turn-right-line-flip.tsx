import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowUTurnRightLineFlip({ size = 24, ...props }: IconProps) {
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
      <path d="M14 5L12 5C9.2386 5 7 7.2386 7 10C7 12.7614 9.2386 15 12 15L20 15M16 19L20.8123 15.3904C21.0625 15.1903 21.0625 14.8097 20.8123 14.6096L16 11M3 20L3 4" fill="none"/>
    </svg>
  )
}
