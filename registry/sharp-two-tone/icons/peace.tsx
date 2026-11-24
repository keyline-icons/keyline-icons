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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1C18.0751 1 23 5.9249 23 12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M19.0711 19.0711L12 12M4.929 19.0711L12 12M12 2L12 12L12 22M19.0711 19.0711C20.8807 17.2614 22 14.7614 22 12C22 6.4772 17.5228 2 12 2C6.4772 2 2 6.4772 2 12C2 14.7614 3.1193 17.2614 4.929 19.0711C6.7386 20.8807 9.2386 22 12 22C14.7614 22 17.2614 20.8807 19.0711 19.0711Z"/>
    </svg>
  )
}
