import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Helicopter({ size = 24, ...props }: IconProps) {
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
      <path d="M7 6L21 6M14 6L14 10M21.5207 14L16.5207 14M7 10L17.4793 10C18.5511 10 19.5414 10.5718 20.0773 11.5L21.6651 14.25C21.8845 14.63 22 15.0612 22 15.5C22 16.8807 20.8807 18 19.5 18L12.7735 18C12.059 18 11.3988 17.6188 11.0415 17L7 10ZM2 10L7 10M2 7L2 13"/>
    </svg>
  )
}
