import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Car({ size = 24, ...props }: IconProps) {
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
      <path d="M1 16L1 13.6491C1 13.1117 1.0866 12.5778 1.2566 12.068L3.2621 6.0513C3.6705 4.8263 4.8169 4 6.1082 4L12.0975 4C12.9582 4 13.7775 4.3697 14.347 5.0151L18.5717 9.8031L20.9487 10.5955C22.1737 11.0038 23 12.1502 23 13.4415L23 16C23 17.1046 22.1046 18 21 18L3 18C1.8954 18 1 17.1046 1 16Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 17C8 18.1046 7.1046 19 6 19C4.8954 19 4 18.1046 4 17C4 15.8954 4.8954 15 6 15C7.1046 15 8 15.8954 8 17ZM19 17C19 18.1046 18.1046 19 17 19C15.8954 19 15 18.1046 15 17C15 15.8954 15.8954 15 17 15C18.1046 15 19 15.8954 19 17Z"/>
    </svg>
  )
}
