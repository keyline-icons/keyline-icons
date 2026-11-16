import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LampFloor({ size = 24, ...props }: IconProps) {
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
      <path d="M12 12V22M8 22H16" strokeOpacity="0.4"/>
      <path d="M14 1C14.379 1 14.725 1.214 14.895 1.553L19.895 11.553C20.049 11.863 20.033 12.231 19.851 12.525C19.668 12.82 19.347 13 19 13H5C4.653 13 4.332 12.82 4.149 12.525C3.967 12.231 3.951 11.863 4.105 11.553L9.105 1.553L9.177 1.432C9.362 1.164 9.669 1 10 1H14Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
