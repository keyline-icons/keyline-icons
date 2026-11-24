import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Peace({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2C17.5228 2 22 6.4772 22 12C22 14.7614 20.8807 17.2614 19.0711 19.0711M12 2C6.4772 2 2 6.4772 2 12C2 14.7614 3.1193 17.2614 4.92895 19.0711M12 2V12M19.0711 19.0711C17.2614 20.8807 14.7614 22 12 22M19.0711 19.0711L12 12M19.0711 19.0711M12 22C9.2386 22 6.7386 20.8807 4.92895 19.0711M12 22V12M4.92895 19.0711L12 12M4.92895 19.0711"/>
    </svg>
  )
}
