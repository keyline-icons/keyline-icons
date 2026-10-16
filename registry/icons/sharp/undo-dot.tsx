import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UndoDot({ size = 24, ...props }: IconProps) {
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
      <path d="M22 19L22 18C22 11.6487 16.8513 6.5 10.5 6.5C7.45 6.5 4.5249 7.7116 2.3683 9.8683L2 10.2365M2 5L2 10.2365L7.2365 10.2365" fill="none"/>
      <path d="M12.5 17C12.5 18.1046 11.6046 19 10.5 19C9.3954 19 8.5 18.1046 8.5 17C8.5 15.8954 9.3954 15 10.5 15C11.6046 15 12.5 15.8954 12.5 17Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
