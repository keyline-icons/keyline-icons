import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CirclesThree({ size = 24, ...props }: IconProps) {
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
      <path d="M3.416 10.71C4.618 14.27 8.039 17 12 17C12.98 17 14.096 16.78 14.979 16.49C14.64 20.04 11.638 23 8 23C4.134 23 1 19.87 1 16C1 13.95 2.015 11.99 3.416 10.71Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M12 1C15.866 1 19 4.13 19 8C19 11.87 15.866 15 12 15C8.134 15 5 11.87 5 8C5 4.13 8.134 1 12 1Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M16 9C19.866 9 23 12.13 23 16C23 19.87 19.866 23 16 23C12.134 23 9 19.87 9 16C9 12.13 12.134 9 16 9Z" fill="currentColor"/>
    </svg>
  )
}
