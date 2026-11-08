import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CaseUpper({ size = 24, ...props }: IconProps) {
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
      <path d="M2 18L3.7857 13L6.0583 6.668C6.3743 5.783 7.6257 5.783 7.9417 6.668L10.2143 13L12 18M10.2143 13H3.7857" strokeOpacity="0.4"/>
      <path d="M21.1 15L19.8091 10.697C19.5412 9.804 18.4588 9.804 18.1909 10.697L16.9 15M21.1 15H16.9M21.1 15L22 18M16.9 15L16 18"/>
    </svg>
  )
}
