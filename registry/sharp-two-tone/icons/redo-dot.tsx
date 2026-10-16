import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RedoDot({ size = 24, ...props }: IconProps) {
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
      <path d="M2 19L2 18C2 11.6487 7.1487 6.5 13.5 6.5C16.55 6.5 19.4751 7.7116 21.6317 9.8683L22 10.2365M22 5L22 10.2365L16.7635 10.2365" fill="none" strokeOpacity="0.4"/>
      <path d="M11.5 17C11.5 18.1046 12.3954 19 13.5 19C14.6046 19 15.5 18.1046 15.5 17C15.5 15.8954 14.6046 15 13.5 15C12.3954 15 11.5 15.8954 11.5 17Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
